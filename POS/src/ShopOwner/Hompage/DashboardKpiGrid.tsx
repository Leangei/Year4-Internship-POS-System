import type { LucideIcon } from 'lucide-react'

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
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.title} className={`rounded-[20px] p-5 shadow-[var(--dp-shadow-card)] ${card.bg}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium opacity-80">{card.title}</p>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${card.bg === 'bg-[#064E2B] text-white' ? 'bg-white/10' : 'bg-[var(--dp-lime-100)]'} text-current`}>
                <Icon size={20} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold">{card.value}</p>
            <p className={`mt-1 text-xs ${card.bg === 'bg-[#064E2B] text-white' ? 'text-[var(--dp-lime-100)]' : 'text-slate-500'}`}>{card.subtitle}</p>
          </div>
        )
      })}
    </div>
  )
}
