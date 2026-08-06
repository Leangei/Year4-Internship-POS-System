import { useState } from 'react'
import { Check, X, Search, Mail, Phone, User, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getPendingShops, approveShop, rejectShop, getShops } from '../../stores/ShopData'
import type { Shop } from '../../stores/ShopData'

export default function SuperAdminApprovalPage() {
  const { t } = useTranslation('superApproval')
  const [shops, setShops] = useState<Shop[]>(getShops)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')

  const refreshShops = () => {
    setShops(getShops())
  }

  const handleApprove = (shopId: string) => {
    approveShop(shopId)
    refreshShops()
  }

  const handleReject = (shopId: string) => {
    rejectShop(shopId)
    refreshShops()
  }

  const filteredShops = (filter === 'all' ? shops : shops.filter((s) => s.status === filter))
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      (s.email || '').toLowerCase().includes(search.toLowerCase())
    )

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('pendingStatus')
      case 'approved':
        return t('approvedStatus')
      case 'rejected':
        return t('rejectedStatus')
      default:
        return status
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{t('title')}</h1>
          <p className="mt-1 text-slate-600">
            {t('pendingCount', { count: getPendingShops().length })}
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {getPendingShops().length} {t('pending')} / {shops.length} {t('all')}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
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
          <option value="pending">{t('pending')}</option>
          <option value="approved">{t('approved')}</option>
          <option value="rejected">{t('rejected')}</option>
          <option value="all">{t('all')}</option>
        </select>
      </div>

      {/* Application Cards */}
      {filteredShops.length === 0 ? (
        <div className="py-16 text-center text-slate-400">
          {t('noShopsFound')}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Left Section - Shop Information */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Shop Logo / Initials */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-900 text-lg font-bold text-white">
                  {getInitials(shop.name)}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Shop Name + Status Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-slate-900 truncate">{shop.name}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge(shop.status)}`}>
                      {getStatusLabel(shop.status)}
                    </span>
                  </div>

                  {/* Shop Email */}
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{shop.email || '—'}</span>
                  </div>

                  {/* Owner Name + Phone */}
                  <div className="mt-1 flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-slate-400 shrink-0" />
                      {shop.owner}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400 shrink-0" />
                      {shop.phone}
                    </span>
                  </div>

                  {/* Submission Date */}
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={13} className="shrink-0" />
                    {t('submittedOn', {
                      date: new Date(shop.createdAt).toLocaleDateString(),
                      time: new Date(shop.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    })}
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {shop.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(shop.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <X size={15} />
                      {t('reject')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(shop.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
                    >
                      <Check size={15} />
                      {t('approve')}
                    </button>
                  </>
                ) : shop.status === 'approved' ? (
                  <button
                    type="button"
                    onClick={() => handleReject(shop.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <X size={15} />
                    {t('reject')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApprove(shop.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
                  >
                    <Check size={15} />
                    {t('approve')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}