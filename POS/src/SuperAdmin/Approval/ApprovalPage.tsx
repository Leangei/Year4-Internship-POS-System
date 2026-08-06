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
    <div className="space-y-3 sm:space-y-4">
      {/* Header - single white background */}
      <div className="rounded-[16px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[20px] sm:p-5">
        <div className="flex flex-row items-start justify-between gap-2">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="text-xl font-semibold text-slate-900 sm:text-3xl">{t('title')}</h1>
            <p className="text-xs text-slate-600 sm:text-sm">
              {t('pendingCount', { count: getPendingShops().length })}
            </p>
          </div>
          <p className="shrink-0 text-xs text-slate-500 sm:pt-1 sm:text-sm">
            {getPendingShops().length} {t('pending')} / {shops.length} {t('all')}
          </p>
        </div>
      </div>

      {/* Search + Filter - no white background */}
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
        >
          <option value="pending">{t('pending')}</option>
          <option value="approved">{t('approved')}</option>
          <option value="rejected">{t('rejected')}</option>
          <option value="all">{t('all')}</option>
        </select>
      </div>

      {/* Application Cards */}
      <div className="rounded-[16px] bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:rounded-[20px] sm:p-5">
        {filteredShops.length === 0 ? (
          <div className="py-12 text-center text-slate-400 sm:py-16">
            {t('noShopsFound')}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
              >
                {/* Left Section - Shop Information */}
                <div className="flex items-start gap-3 flex-1 min-w-0 sm:gap-4">
                  {/* Shop Logo / Initials */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-900 text-base font-bold text-white sm:h-14 sm:w-14 sm:text-lg">
                    {getInitials(shop.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Shop Name + Status Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-900 truncate sm:text-base">{shop.name}</h3>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-0.5 sm:text-xs ${statusBadge(shop.status)}`}>
                        {getStatusLabel(shop.status)}
                      </span>
                    </div>

                    {/* Shop Email */}
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 sm:text-sm">
                      <Mail size={13} className="text-slate-400 shrink-0 sm:text-sm" />
                      <span className="truncate">{shop.email || '—'}</span>
                    </div>

                    {/* Owner Name + Phone */}
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-600 flex-wrap sm:gap-4 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <User size={13} className="text-slate-400 shrink-0 sm:text-sm" />
                        {shop.owner}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} className="text-slate-400 shrink-0 sm:text-sm" />
                        {shop.phone}
                      </span>
                    </div>

                    {/* Submission Date */}
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 sm:text-xs">
                      <Calendar size={12} className="shrink-0 sm:text-xs" />
                      {t('submittedOn', {
                        date: new Date(shop.createdAt).toLocaleDateString(),
                        time: new Date(shop.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  {shop.status === 'pending' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReject(shop.id)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors sm:flex-none sm:px-4 sm:py-2 sm:text-sm"
                      >
                        <X size={14} />
                        {t('reject')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(shop.id)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 transition-colors sm:flex-none sm:px-4 sm:py-2 sm:text-sm"
                      >
                        <Check size={14} />
                        {t('approve')}
                      </button>
                    </>
                  ) : shop.status === 'approved' ? (
                    <button
                      type="button"
                      onClick={() => handleReject(shop.id)}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                    >
                      <X size={14} />
                      {t('reject')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApprove(shop.id)}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 transition-colors sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                    >
                      <Check size={14} />
                      {t('approve')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}