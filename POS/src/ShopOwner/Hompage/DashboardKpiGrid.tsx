import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'
import { ShoppingBag, DollarSign } from 'lucide-react'

export type KpiCardItem = {
  title: string
  value: string
  icon: LucideIcon
  bg: string
  subtitle: string
}

type DashboardKpiGridProps = {
  cards: KpiCardItem[]
}

export default function DashboardKpiGrid({ cards }: DashboardKpiGridProps) {
  const { t } = useTranslation("homepage")
  const totalRevenue = cards[0]?.value ?? '$12,450.00'
  const revenueSubtitle = cards[0]?.subtitle ?? 'fromLastMonth'
  const totalOrders = cards[1]?.value ?? '128'
  const avgOrder = cards[2]?.value ?? '$97.27'

  return (
    <>
      {/* Mobile: Compact layout - uses data from the selected variant */}
      <div className="rounded-[20px] bg-[#064E2B] p-5 text-white shadow-[var(--dp-shadow-card)] lg:hidden">
        {/* Top: ចំណូលសរុប */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--dp-lime-100)]">{t('totalRevenue')}</p>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
            <DollarSign size={18} />
          </span>
        </div>
        <p className="mt-1 text-4xl font-extrabold tracking-tight">{totalRevenue}</p>
        <p className="mt-1 text-[11px] text-[var(--dp-lime-100)]">{t(revenueSubtitle)}</p>

        {/* Bottom: Two indicators side by side */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10">
              <ShoppingBag size={18} />
            </span>
            <div>
              <p className="text-[11px] text-[var(--dp-lime-100)]">{t('totalOrders')}</p>
              <p className="text-lg font-bold leading-tight">{totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10">
              <DollarSign size={18} />
            </span>
            <div>
              <p className="text-[11px] text-[var(--dp-lime-100)]">{t('avgOrderShort')}</p>
              <p className="text-lg font-bold leading-tight">{avgOrder}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: 3 separate cards in a grid */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className={`rounded-[20px] p-5 shadow-[var(--dp-shadow-card)] ${card.bg}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium opacity-80">{t(card.title)}</p>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${card.bg === 'bg-[#064E2B] text-white' ? 'bg-white/10' : 'bg-[var(--dp-lime-100)]'} text-current`}>
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">{card.value}</p>
              <p className={`mt-1 text-xs ${card.bg === 'bg-[#064E2B] text-white' ? 'text-[var(--dp-lime-100)]' : 'text-slate-500'}`}>{t(card.subtitle)}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}