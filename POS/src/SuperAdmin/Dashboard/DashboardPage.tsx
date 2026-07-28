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

const actionButtons = [
  { label: 'បង្កើតហាង', icon: PlusCircle, variant: 'solid' },
  { label: 'បង្កើតផែនការ', icon: PlusCircle, variant: 'outline' },
]

const kpiCards = [
  {
    title: 'ចំណូលសរុប',
    value: '$4,820',
    detail: '+8.2% ទៅសប្តាហ៍មុន',
    icon: DollarSign,
    accent: 'bg-[#134F07] text-white',
  },
  {
    title: 'ចំនួនហាង',
    value: '128',
    detail: '+10 ហាងថ្មីក្នុងរយៈពេលនេះ',
    icon: Store,
    accent: 'bg-[#BAF912] text-slate-900',
  },
  {
    title: 'កម្មវិធីជាវសកម្ម',
    value: '96',
    detail: '+5 សប្តាហ៍នេះ',
    icon: ShieldCheck,
    accent: 'bg-[#134F07] text-white',
  },
  {
    title: 'កម្មវិធីជាវនឹងផុតកំណត់',
    value: '5',
    detail: '+8.2% ពីសប្តាហ៍មុន',
    icon: Clock,
    accent: 'bg-[#BAF912] text-slate-900',
  },
]

const registrationData = [
  { label: '10 មិថុនា', value: 5 },
  { label: '11 មិថុនា', value: 8 },
  { label: '12 មិថុនា', value: 6 },
  { label: '13 មិថុនា', value: 10, highlight: true },
  { label: '14 មិថុនា', value: 7 },
  { label: '15 មិថុនា', value: 12 },
  { label: '16 មិថុនា', value: 9 },
]

const subscriptionDistribution = [
  { label: 'មូលដ្ឋាន', value: 45, color: '#16A34A' },
  { label: 'ស្តង់ដារ', value: 32, color: '#84CC16' },
  { label: 'ពិចារណា', value: 23, color: '#65A30D' },
]

const recentShops = [
  { name: 'New Business', owner: 'Testing Owner', date: '15/06/2026', status: 'សកម្ម' },
  { name: 'Demo Shop', owner: 'Admin Demo', date: '12/06/2026', status: 'កំពុងរង់ចាំ' },
  { name: 'Psar Online', owner: 'Mr. Srey', date: '10/06/2026', status: 'សកម្ម' },
  { name: 'Ola Retail Co.', owner: 'Demo Admin', date: '08/06/2026', status: 'ផុតកំណត់' },
]

const recentActivities = [
  {
    icon: AlertTriangle,
    title: 'កម្មវិធីជាវនឹងផុតកំណត់',
    details: 'កម្មវិធីជាវរបស់ Demo Shop នឹងផុតកំណត់នៅក្នុង 3 ថ្ងៃ',
  },
  {
    icon: CheckCircle,
    title: 'ហាងថ្មីបានចុះឈ្មោះ',
    details: 'New Business បានចូលលើផ្លាតហ្វូមថ្ងៃនេះ',
  },
  {
    icon: Bell,
    title: 'ដែនកំណត់ផ្ទុកបានដល់',
    details: 'Psar Online បានដល់ 85% នៃដែនកំណត់ផ្ទុក',
  },
  {
    icon: Activity,
    title: 'សារ​សេវា​ជំនួយ​បានទទួល',
    details: 'សំបុត្រជំនួយថ្មីមកពី Demo Shop',
  },
]

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = 58
  const circumference = 2 * Math.PI * radius

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      {data.reduce<{ label: string; value: number; color: string; start: number; end: number }[]>((acc, item) => {
        const start = acc.length > 0 ? acc[acc.length - 1].end : 0
        const end = start + item.value
        acc.push({ ...item, start, end })
        return acc
      }, []).map((segment) => {
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
          />
        )
      })}
      <circle cx="80" cy="80" r="36" fill="white" />
      <text x="80" y="76" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111">120</text>
      <text x="80" y="94" textAnchor="middle" fontSize="10" fill="#667085">ផែនការ</text>
    </svg>
  )
}

export default function SuperAdminDashboardPage() {
  const maxRegistration = Math.max(...registrationData.map((item) => item.value))

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">ទិដ្ឋភាពទូទៅ</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            ទំព័រគ្រប់គ្រងមេដឹកនាំសម្រាប់ DamreiPOS ដែលមានសកម្មភាពរហ័សសម្រាប់បង្កើតហាង និងផែនការជាវ។
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {actionButtons.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm shadow-[rgba(0,0,0,0.08)] ${
                  action.variant === 'solid'
                    ? 'bg-[var(--dp-green-950)] text-white'
                    : 'border border-slate-200 bg-white text-slate-900'
                }`}
              >
                <Icon size={16} />
                {action.label}
              </button>
            )
          })}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon
          const isBright = card.accent.includes('#BAF912')
          return (
            <div key={card.title} className={`rounded-[28px] p-5 shadow-[var(--dp-shadow-card)] ${card.accent}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-medium ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>{card.title}</p>
                  <p className="mt-4 text-3xl font-bold">{card.value}</p>
                </div>
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${isBright ? 'bg-white text-slate-900' : 'bg-white text-[#134F07]'}`}>
                  <Icon size={22} />
                </span>
              </div>
              <p className={`mt-4 text-sm ${isBright ? 'text-slate-500' : 'text-[#BAF912]/90'}`}>
                {card.detail}
              </p>
            </div>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">តារាងចុះឈ្មោះហាង</h2>
              <p className="mt-1 text-sm text-slate-500">បង្ហាញចំនួនហាងថ្មីដែលបានចុះឈ្មោះក្នុងរយៈពេលថ្មីៗនេះ។</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              <ArrowRight size={16} /> ព័ត៌មានលម្អិត
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] bg-slate-50 p-6">
            <div className="flex items-end gap-3 h-64">
              {registrationData.map((item) => {
                const height = (item.value / maxRegistration) * 100
                return (
                  <div key={item.label} className="flex-1">
                    <div
                      className={`mx-auto flex h-full w-full flex-col justify-end rounded-[20px] ${item.highlight ? 'bg-[var(--dp-green-950)]' : 'bg-[var(--dp-lime-200)]'}`}
                      style={{ height: `${Math.max(height, 16)}%` }}
                    >
                      <span className="sr-only">{item.label} {item.value} registrations</span>
                    </div>
                    <p className="mt-3 text-center text-xs text-slate-500">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">ចែកចាយកម្មវិធីជាវ</h2>
              <p className="mt-1 text-sm text-slate-500">ភាគរយនៃហាងដែលប្រើផែនការជាវនិច្ចនីមួយៗ។</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-40 w-40">
                <DonutChart data={subscriptionDistribution} />
              </div>
              <div className="flex-1 space-y-3">
                {subscriptionDistribution.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700">{item.label}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">ហាងដែលចុះឈ្មោះថ្មីៗ</h3>
              <p className="mt-1 text-sm text-slate-500">ហាងដែលទើបឈានចូល និងស្ថានភាពបច្ចុប្បន្នរបស់ពួកគេ។</p>
            </div>
            <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">មើលទាំងអស់</button>
          </div>
          <div className="mt-6 space-y-4">
            {recentShops.map((shop) => (
              <div key={shop.name} className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--dp-green-950)] text-white">
                    <Store size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{shop.name}</p>
                    <p className="text-sm text-slate-500">{shop.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">{shop.date}</p>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${shop.status === 'សកម្ម' ? 'bg-emerald-100 text-emerald-700' : shop.status === 'កំពុងរង់ចាំ' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {shop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">សកម្មភាពថ្មីៗ</h3>
              <p className="mt-1 text-sm text-slate-500">ព្រឹត្តិការណ៍លើផ្លាតហ្វូមដែលត្រូវការយកចិត្តទុកដាក់ពីអ្នកគ្រប់គ្រង។</p>
            </div>
            <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">មើលទាំងអស់</button>
          </div>
          <div className="mt-6 space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.title} className="group flex items-center justify-between gap-4 rounded-[24px] border border-slate-100 bg-slate-50 p-4 transition hover:border-[var(--dp-green-950)] hover:bg-[var(--dp-lime-100)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--dp-green-950)] text-white">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{activity.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{activity.details}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:text-[var(--dp-green-950)]" />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
