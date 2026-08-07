import { useTranslation } from 'react-i18next'
import { Eye, Pencil, Trash2, Star, XCircle, User } from 'lucide-react'
import type { Customer } from '../CustomerData'

const customerImageModules = import.meta.glob('../../../assets/customer/*.svg', { eager: true }) as Record<
  string,
  { default: string }
>

const customerImageMap = Object.entries(customerImageModules).reduce<Record<string, string>>((map, [path, module]) => {
  const fileName = path.split('/').pop() ?? ''
  map[fileName] = module.default
  return map
}, {})

interface CustomerTableProps {
  customers: Customer[]
  onEdit?: (customer: Customer) => void
  onDelete?: (customer: Customer) => void
}

export default function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  const { t } = useTranslation('customer')

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const getPhotoSrc = (photo?: string) => {
    if (!photo) return ''
    if (/^https?:\/\//.test(photo) || photo.startsWith('/') || photo.startsWith('data:')) {
      return photo
    }
    return customerImageMap[photo] || ''
  }

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'vip':
        return (
          <span className="dp-pill dp-pill--ok">
            <span className="dp-pill__ico">
              <Star size={12} strokeWidth={2} />
            </span>
            <span className="dp-pill__label">{t('list.vip')}</span>
          </span>
        )
      case 'regular':
        return (
          <span className="dp-pill dp-pill--neutral">
            <span className="dp-pill__ico">
              <User size={12} strokeWidth={2} />
            </span>
            <span className="dp-pill__label">{t('list.regular')}</span>
          </span>
        )
      case 'new':
        return (
          <span className="dp-pill dp-pill--neutral">
            <span className="dp-pill__ico">
              <User size={12} strokeWidth={2} />
            </span>
            <span className="dp-pill__label">{t('list.new')}</span>
          </span>
        )
      default:
        return (
          <span className="dp-pill dp-pill--danger">
            <span className="dp-pill__ico">
              <XCircle size={12} strokeWidth={2} />
            </span>
            <span className="dp-pill__label">{status}</span>
          </span>
        )
    }
  }

  return (
    <div className="dp-table">
      {/* ── Mobile: Card List (hidden on desktop) ── */}
      <div className="lg:hidden flex flex-col gap-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-[var(--dp-r-card)] border border-[var(--dp-line)] shadow-[var(--dp-shadow-card)] p-4"
          >
            {/* Avatar + Name + Status + Action buttons */}
            <div className="flex items-center gap-3">
              <span className="dp-avatar dp-avatar--lime" title={customer.name} style={{ '--dp-avatar-size': '44px' } as React.CSSProperties}>
                {getPhotoSrc(customer.photo) ? (
                  <img className="dp-avatar__img" src={getPhotoSrc(customer.photo)} alt={customer.name} />
                ) : (
                  <span className="dp-avatar__initials">{getInitials(customer.name)}</span>
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="cu-name">{customer.name}</div>
                  {getStatusPill(customer.status)}
                </div>
                <div className="cu-sub dp-tnum">{customer.phone}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-body)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-surface-2)] hover:border-[var(--dp-line-strong)]"
                  aria-label={t('list.edit')}
                  title={t('list.edit')}
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit?.(customer)
                  }}
                >
                  <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                    <Pencil size={16} strokeWidth={1.9} />
                  </span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-danger-ink)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-danger-tint)] hover:border-[var(--dp-line-strong)]"
                  aria-label={t('list.delete')}
                  title={t('list.delete')}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.(customer)
                  }}
                >
                  <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                    <Trash2 size={16} strokeWidth={1.9} />
                  </span>
                </button>
              </div>
            </div>

            {/* Total Spent / Total Orders */}
            <div className="mt-3 flex items-center justify-between border-t border-[var(--dp-line)] pt-3">
              <div>
                <div className="text-[10px] leading-[1.4] text-[var(--dp-muted)]">{t('list.totalSpent')}</div>
                <div className="cu-money dp-tnum">${customer.totalSpent.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] leading-[1.4] text-[var(--dp-muted)]">{t('list.totalOrders')}</div>
                <div className="cu-sub dp-tnum" style={{ marginTop: '0px' }}>{customer.totalOrders}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: Table (hidden on mobile) ── */}
      <div className="hidden lg:block dp-table__scroll">
        <table className="dp-table__el" style={{ minWidth: '820px' }}>
          <thead>
            <tr>
              <th scope="col" className="dp-table__th" style={{ minWidth: '260px' }}>{t('list.title')}</th>
              <th scope="col" className="dp-table__th" style={{ minWidth: '150px' }}>{t('list.status')}</th>
              <th scope="col" className="dp-table__th" style={{ minWidth: '120px' }}>{t('list.totalSpent')}</th>
              <th scope="col" className="dp-table__th" style={{ minWidth: '110px' }}>{t('list.totalOrders')}</th>
              <th scope="col" className="dp-table__th" style={{ minWidth: '140px' }}>{t('list.action')}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="dp-table__tr is-clickable" role="button" tabIndex={0}>
                <td className="dp-table__td">
                  <div className="cu-cell">
                    <span className="dp-avatar dp-avatar--lime" title={customer.name} style={{ '--dp-avatar-size': '44px' } as React.CSSProperties}>
                      {getPhotoSrc(customer.photo) ? (
                        <img className="dp-avatar__img" src={getPhotoSrc(customer.photo)} alt={customer.name} />
                      ) : (
                        <span className="dp-avatar__initials">{getInitials(customer.name)}</span>
                      )}
                    </span>
                    <div style={{ minWidth: '0px' }}>
                      <div className="cu-name">{customer.name}</div>
                      <div className="cu-sub dp-tnum">{customer.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="dp-table__td">
                  {getStatusPill(customer.status)}
                </td>
                <td className="dp-table__td">
                  <span className="cu-money dp-tnum">${customer.totalSpent.toFixed(2)}</span>
                </td>
                <td className="dp-table__td">
                  <span className="cu-sub dp-tnum" style={{ marginTop: '0px' }}>{customer.totalOrders} {t('list.totalOrders')}</span>
                </td>
                <td className="dp-table__td">
                  <span style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-body)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-surface-2)] hover:border-[var(--dp-line-strong)]"
                      aria-label={t('list.viewDetails')}
                      title={t('list.viewDetails')}
                    >
                      <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                        <Eye size={16} strokeWidth={1.9} />
                      </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-body)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-surface-2)] hover:border-[var(--dp-line-strong)]"
                      aria-label={t('list.edit')}
                      title={t('list.edit')}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(customer)
                      }}
                    >
                      <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                        <Pencil size={16} strokeWidth={1.9} />
                      </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-danger-ink)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-danger-tint)] hover:border-[var(--dp-line-strong)]"
                      aria-label={t('list.delete')}
                      title={t('list.delete')}
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete?.(customer)
                      }}
                    >
                      <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                        <Trash2 size={16} strokeWidth={1.9} />
                      </span>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}