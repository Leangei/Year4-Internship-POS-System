import { useState } from 'react'
import { Check, X, Search } from 'lucide-react'
import { getPendingShops, approveShop, rejectShop, getShops, seedDemoShops } from '../../stores/ShopData'
import type { Shop } from '../../stores/ShopData'

export default function SuperAdminApprovalPage() {
  const [shops, setShops] = useState<Shop[]>(() => {
    seedDemoShops()
    return getPendingShops()
  })
  const [allShops] = useState<Shop[]>(() => {
    seedDemoShops()
    return getShops()
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')

  const handleApprove = (shopId: string) => {
    approveShop(shopId)
    setShops(getPendingShops())
  }

  const handleReject = (shopId: string) => {
    rejectShop(shopId)
    setShops(getPendingShops())
  }

  const filteredShops = (filter === 'pending' ? shops : filter === 'all' ? allShops : allShops.filter((s) => s.status === filter))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search))

  const statusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Approval</h1>
          <p className="mt-1 text-slate-600">Manage shop approvals from SuperAdmin.</p>
        </div>
        <div className="text-sm text-slate-500">
          {shops.length} pending / {allShops.length} total
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-transparent pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3 pr-4 font-medium">Shop Name</th>
              <th className="pb-3 pr-4 font-medium">Email</th>
              <th className="pb-3 pr-4 font-medium">Owner</th>
              <th className="pb-3 pr-4 font-medium">Phone</th>
              <th className="pb-3 pr-4 font-medium">Created</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.length === 0 ? (
              <tr>
                <td colSpan={7} className="pt-6 pb-6 text-center text-slate-400">
                  No shops found.
                </td>
              </tr>
            ) : (
              filteredShops.map((shop) => (
                <tr key={shop.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{shop.name}</td>
                  <td className="py-3 pr-4 text-slate-600">{shop.email}</td>
                  <td className="py-3 pr-4 text-slate-600">{shop.owner}</td>
                  <td className="py-3 pr-4 text-slate-600 whitespace-nowrap">{shop.phone}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs whitespace-nowrap">
                    {new Date(shop.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge(shop.status)}`}>
                      {shop.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {shop.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApprove(shop.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-800 transition-colors"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(shop.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}