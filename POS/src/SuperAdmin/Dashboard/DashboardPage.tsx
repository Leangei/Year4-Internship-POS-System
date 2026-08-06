import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  PlusCircle,
  ShieldCheck,
  Store,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import demoShopImg from '../../assets/shop/Demo Shop.svg'
import nearyFashionImg from '../../assets/shop/NearyFashion.svg'
import oldRetailImg from '../../assets/shop/Old Retail.svg'
import psarOnlineImg from '../../assets/shop/Psar Online.svg'

const shopImages: Record<string, string> = {
  'Demo Shop': demoShopImg,
  'Neary Fashion': nearyFashionImg,
  'Psar Online': psarOnlineImg,
  'Ola Retail Co.': oldRetailImg,
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = 58
  const circumference = 2 * Math.PI * radius

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full drop-shadow-sm">
      <defs>
        {data.map((item, i) => (
          <filter key={item.label} id={`donut-glow-${i}`}>
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={item.color} floodOpacity="0.3" />
          </filter>
        ))}
      </defs>
      {data.reduce<{ label: string; value: number; color: string; start: number; end: number }[]>((acc, item) => {
        const start = acc.length > 0 ? acc[acc.length - 1].end : 0
        const end = start + item.value
        acc.push({ ...item, start, end })
        return acc
      }, []).map((segment, i) => {
        const offset = (segment.start / total) * circumference
        const length = (segment.value / total) * circumference
        return (
          <circle
            key={segment.label}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth="24"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 80 80)"
            strokeLinecap="round"
            filter={`url(#donut-glow-${i})`}
            className="transition-all duration-500 ease-out hover:stroke-[28] hover:brightness-110"
            style={{ cursor: 'pointer' }}
          />
        )
      })}
      {/* Inner ring decoration */}
      <circle cx="80" cy="80" r="36" fill="white" stroke="#E8F5E9" strokeWidth="1" />
      <text x="80" y="74" textAnchor="middle" fontSize="22" fontWeight="800" fill="#134F07" fontFamily="'Noto Sans Khmer', sans-serif">120</text>
      <text x="80" y="94" textAnchor="middle" fontSize="10" fill="#667085" fontWeight="500" fontFamily="'Noto Sans Khmer', sans-serif">ផែនការ</text>
    </svg>
  )
}

export default function SuperAdminDashboardPage() {
  const { t } = useTranslation('superHomepage')

  const actionButtons = [
    { label: t('createShop'), icon: PlusCircle, variant: 'solid' },
    { label: t('createPlan'), icon: PlusCircle, variant: 'outline' },
  ]

  const kpiCards = [
    {
      title: t('totalRevenue'),
      value: '$4,820',
      detail: t('totalRevenueDetail'),
      icon: DollarSign,
      accent: 'bg-[#134F07] text-white',
    },
    {
      title: t('shopCount'),
      value: '128',
      detail: t('shopCountDetail'),
      icon: Store,
      accent: 'bg-[#BAF912] text-slate-900',
    },
    {
      title: t('activeSubscriptions'),
      value: '96',
      detail: t('activeSubscriptionsDetail'),
      icon: ShieldCheck,
      accent: 'bg-[#134F07] text-white',
    },
    {
      title: t('expiringSubscriptions'),
      value: '5',
      detail: t('expiringSubscriptionsDetail'),
      icon: Clock,
      accent: 'bg-[#BAF912] text-slate-900',
    },
  ]

  const registrationData = [
    { label: t('monthJan'), value: 45 },
    { label: t('monthFeb'), value: 52 },
    { label: t('monthMar'), value: 38 },
    { label: t('monthApr'), value: 65 },
    { label: t('monthMay'), value: 48 },
    { label: t('monthJun'), value: 72, highlight: true },
    { label: t('monthJul'), value: 55 },
    { label: t('monthAug'), value: 60 },
  ]

  const subscriptionDistribution = [
    { label: t('freePlan'), value: 45, color: '#16A34A' },
    { label: t('businessPlan'), value: 32, color: '#84CC16' },
    { label: t('enterprisePlan'), value: 23, color: '#65A30D' },
  ]

  const recentShops = [
    { name: t('recentShopOne'), owner: t('recentShopOwnerOne'), date: '15/06/2026', status: t('activeStatus') },
    { name: t('recentShopTwo'), owner: t('recentShopOwnerTwo'), date: '12/06/2026', status: t('pendingStatus') },
    { name: t('recentShopThree'), owner: t('recentShopOwnerThree'), date: '10/06/2026', status: t('activeStatus') },
    { name: t('recentShopFour'), owner: t('recentShopOwnerFour'), date: '08/06/2026', status: t('expiredStatus') },
  ]

  const recentActivities = [
    {
      icon: AlertTriangle,
      title: t('expiringSubscriptionAlert'),
      details: t('expiringSubscriptionAlertDetail'),
      iconBg: '#FFF0E6',
      iconColor: '#F97316',
    },
    {
      icon: CheckCircle,
      title: t('newShopRegistered'),
      details: t('newShopRegisteredDetail'),
      iconBg: '#E8F1EA',
      iconColor: '#456B4C',
    },
    {
      icon: Bell,
      title: t('storageAlert'),
      details: t('storageAlertDetail'),
      iconBg: '#EDF0E0',
      iconColor: '#4A6700',
    },
    {
      icon: Activity,
      title: t('suspendedShop'),
      details: t('suspendedShopDetail'),
      iconBg: '#FDE8E9',
      iconColor: '#B72028',
    },
  ]

  const maxRegistration = Math.max(...registrationData.map((item) => item.value))

  return (
    <div className="min-h-full w-full bg-[#F8F9FA] px-0 py-2 sm:px-2 sm:py-3 lg:px-6 lg:py-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header Section */}
        <section className="rounded-[24px] bg-white p-4 shadow-[var(--dp-shadow-card)] sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-3xl">{t('overview')}</h1>
              <p className="mt-1 max-w-2xl text-xs text-slate-600 sm:mt-2 sm:text-sm">
                {t('overviewDescription')}
              </p>
            </div>

            <div className="flex w-full flex-row gap-2 sm:flex-nowrap sm:items-center sm:gap-3 lg:ml-auto lg:w-auto lg:justify-end">
              {actionButtons.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold shadow-sm shadow-[rgba(0,0,0,0.08)] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm lg:min-w-[180px] lg:max-w-[220px] border border-[#627A20] bg-white text-[#627A20]`}
                  >
                    <Icon size={14} />
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {kpiCards.map((card) => {
            const Icon = card.icon
            const isBright = card.accent.includes('#BAF912')
            return (
              <div key={card.title} className={`rounded-[20px] p-3 shadow-[var(--dp-shadow-card)] sm:rounded-[28px] sm:p-5 ${card.accent}`}>
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <p className={`text-xs font-medium sm:text-sm ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>{card.title}</p>
                    <p className="mt-2 text-xl font-bold sm:mt-4 sm:text-3xl">{card.value}</p>
                  </div>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${isBright ? 'bg-white text-slate-900' : 'bg-white text-[#134F07]'}`}>
                    <Icon size={18} />
                  </span>
                </div>
                <p className={`mt-2 text-xs sm:mt-4 sm:text-sm ${isBright ? 'text-slate-500' : 'text-[#BAF912]/90'}`}>
                  {card.detail}
                </p>
              </div>
            )
          })}
        </section>

        {/* Charts Section */}
        <section className="grid gap-3 xl:grid-cols-[1.6fr_1fr] items-stretch sm:gap-4">
          {/* Registration Chart */}
          <div className="h-full rounded-[20px] bg-white p-4 shadow-[var(--dp-shadow-card)] sm:rounded-[24px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{t('registrationStats')}</h2>
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{t('registrationStatsDescription')}</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                {t('juneMonth')}
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-[20px] bg-gradient-to-b from-[#F0FDF4] to-[#F8F9FA] p-2 sm:mt-6 sm:rounded-[28px] sm:p-6">
              <div className="flex items-end gap-2 sm:gap-3" style={{ height: '10rem' }}>
                {registrationData.map((item) => {
                  const height = (item.value / maxRegistration) * 100
                  return (
                    <div key={item.label} className="group relative flex flex-1 flex-col h-full items-center justify-end">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 scale-0 rounded-lg bg-[#134F07] px-3 py-1.5 text-xs font-bold text-white shadow-lg transition-all duration-200 group-hover:scale-100">
                        {item.value} {t('shopLabel')}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#134F07]" />
                      </div>
                      <p className="mb-2 text-sm font-bold text-slate-700 transition-all duration-200 group-hover:text-[#134F07]">{item.value}</p>
                      <div
                        className={`relative w-full cursor-pointer transition-all duration-300 ease-out group-hover:brightness-110 group-hover:shadow-lg ${
                          item.highlight
                            ? 'bg-gradient-to-t from-[#16A34A] to-[#9AF672] shadow-[0_4px_12px_rgba(22,163,74,0.3)]'
                            : 'bg-gradient-to-t from-[#86EFAC] to-[#DCFCE7] hover:from-[#16A34A] hover:to-[#9AF672]'
                        }`}
                        style={{
                          height: `${Math.max(height, 16)}%`,
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '20px',
                          minWidth: '24px',
                        }}
                      />
                      <p className="mt-3 text-center text-xs font-medium text-slate-500 transition-all duration-200 group-hover:text-[#134F07]">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Subscription Distribution */}
          <div className="h-full rounded-[20px] bg-white p-4 shadow-[var(--dp-shadow-card)] sm:rounded-[24px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{t('subscriptionPlans')}</h2>
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{t('subscriptionPlansDescription')}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center">
              <div className="mx-auto h-32 w-32 sm:h-40 sm:w-40">
                <DonutChart data={subscriptionDistribution} />
              </div>
              <div className="flex-1 space-y-2 sm:space-y-3">
                {subscriptionDistribution.map((item) => (
                  <div key={item.label} className="group flex items-center justify-between gap-3 rounded-xl p-2 text-sm transition-all duration-200 hover:bg-[#F0FDF4]">
                    <div className="flex items-center gap-3">
                      <span className="relative h-3 w-3 rounded-full transition-all duration-200 group-hover:scale-125 group-hover:shadow-md sm:h-3.5 sm:w-3.5" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-700 font-medium sm:text-sm">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 sm:text-sm">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Shops & Activities */}
        <section className="grid gap-3 xl:grid-cols-[1.4fr_1fr] sm:gap-4">
          {/* Recent Shops */}
          <div className="rounded-[20px] bg-white p-4 shadow-[var(--dp-shadow-card)] sm:rounded-[24px] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{t('newlyRegisteredShops')}</h3>
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{t('newlyRegisteredShopsDescription')}</p>
              </div>
              <button className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{t('viewAll')}</button>
            </div>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {recentShops.map((shop) => (
                <div key={shop.name} className="flex items-center justify-between gap-2 rounded-[20px] border border-slate-100 bg-white p-3 sm:rounded-[24px] sm:p-4 sm:gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white sm:h-12 sm:w-12 sm:rounded-2xl overflow-hidden border border-slate-100">
                      <img src={shopImages[shop.name] || ''} alt={shop.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 sm:text-base truncate">{shop.name}</p>
                      <p className="text-xs text-slate-500 sm:text-sm truncate">{shop.owner} · {shop.date}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold sm:px-3 sm:py-1 ${shop.status === t('activeStatus') ? 'bg-emerald-100 text-emerald-700' : shop.status === t('pendingStatus') ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {shop.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-[20px] bg-white p-4 shadow-[var(--dp-shadow-card)] sm:rounded-[24px] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{t('recentActivities')}</h3>
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{t('recentActivitiesDescription')}</p>
              </div>
              <button className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{t('viewAll')}</button>
            </div>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.title} className="group flex flex-col gap-2 rounded-[20px] border border-slate-100 bg-white p-3 transition hover:border-[var(--dp-green-950)] hover:bg-[var(--dp-lime-100)] sm:flex-row sm:items-center sm:justify-between sm:rounded-[24px] sm:p-4 sm:gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl" style={{ backgroundColor: activity.iconBg, color: activity.iconColor }}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">{activity.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{activity.details}</p>
                      </div>
                    </div>
                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-[var(--dp-green-950)] sm:block" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}