import { Clock, Wallet, Package, DollarSign, Box, Truck, CreditCard, TrendingUp, Calendar } from 'lucide-react'

const kpiCards = [
  {
    title: 'ចំណូលសរុប',
    value: '$12,450.00',
    icon: Wallet,
    bg: 'bg-[var(--dp-green-950)] text-white',
    subtitle: '+15% ពីខែមុន',
  },
  {
    title: 'ការបញ្ជាទិញ',
    value: '128',
    icon: Package,
    bg: 'bg-white text-slate-900',
    subtitle: '18 កំពុងរង់ចាំ',
  },
  {
    title: 'តម្លៃមធ្យមក្នុងមួយការកម្មង់',
    value: '$97.27',
    icon: DollarSign,
    bg: 'bg-white text-slate-900',
    subtitle: 'ធម្មតា',
  },
]

const orderStatusCards = [
  { label: 'មិនទាន់បង់ប្រាក់', count: 12, icon: CreditCard },
  { label: 'កំពុងវេចខ្ចប់', count: 8, icon: Box },
  { label: 'កំពុងដឹកជញ្ជូន', count: 5, icon: Truck },
]

const paymentStatusData = [
  { label: 'បានបង់ប្រាក់', value: 78, color: '#16A34A', amount: '$9,711.00' },
  { label: 'កំពុងរង់ចាំ', value: 15, color: '#F59E0B', amount: '$1,867.50' },
  { label: 'បានលុបចោល', value: 7, color: '#EF4444', amount: '$871.50' },
]

const orderSourceData = [
  { label: 'មកហាង', value: 65, color: '#16A34A' },
  { label: 'Facebook', value: 22, color: '#3B82F6' },
  { label: 'Messenger', value: 13, color: '#8B5CF6' },
]

const bestSellingProducts = [
  { name: 'Doir Lipstick', sold: 102, progress: 100 },
  { name: 'Top T-shirt', sold: 90, progress: 88 },
  { name: 'Pink Pant', sold: 76, progress: 75 },
  { name: 'Cap', sold: 50, progress: 50 },
  { name: 'P-Shoe', sold: 30, progress: 30 },
]

const lowStockProducts = [
  { name: 'Doir Lipstick', stock: 5, status: 'Low Stock', statusColor: 'bg-amber-500' },
  { name: 'Top T-shirt', stock: 2, status: 'Low Stock', statusColor: 'bg-amber-500' },
  { name: 'Pink Pant', stock: 0, status: 'Out of Stock', statusColor: 'bg-red-500' },
  { name: 'Cap', stock: 8, status: 'Low Stock', statusColor: 'bg-amber-500' },
]

const topCustomers = [
  { name: 'យ៉ូន ស្រី', orders: 15, spent: '$1,250.00' },
  { name: 'ស្រី សុភា', orders: 12, spent: '$980.00' },
  { name: 'សុខ ឆៃ', orders: 10, spent: '$875.00' },
  { name: 'រិន ណារ៉ា', orders: 8, spent: '$720.00' },
]

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const radius = 60
  const circumference = 2 * Math.PI * radius

  const segments = data.reduce<({ label: string; value: number; color: string; start: number; end: number })[]>((acc, d) => {
    const start = acc.length > 0 ? acc[acc.length - 1].end : 0
    acc.push({ ...d, start, end: start + d.value })
    return acc
  }, [])

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      {segments.map((seg) => {
        const offset = (seg.start / total) * circumference
        const length = (seg.value / total) * circumference
        return (
          <circle
            key={seg.label}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="28"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 80 80)"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="80" cy="80" r="38" fill="white" />
      <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="700" fill="#191C1D">{total}</text>
      <text x="80" y="94" textAnchor="middle" fontSize="11" fill="#666">សរុប</text>
    </svg>
  )
}

function ProductImagePlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#BAF912] text-xs font-bold text-[#00351B]">
      {initials}
    </span>
  )
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#BAF912] text-xs font-bold text-[#00351B]">
      {initials}
    </span>
  )
}

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Dashboard Summary */}
      <section className="rounded-[24px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2" style={{ fontSize: '20px', fontWeight: 700, color: '#00351B' }}>
              <Calendar size={20} />
              <span>ប្រចាំថ្ងៃ</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--dp-lime-100)] px-4 py-2 text-sm font-medium text-[var(--dp-green-950)]">
              <Clock size={16} />
              <span>07:00 AM – 06:00 PM</span>
            </div>
          </div>
          <div className="flex gap-2">
            {['ថ្ងៃនេះ', 'សប្តាហ៍នេះ', 'ខែនេះ'].map((label) => (
              <button
                key={label}
                className={`rounded-[10px] px-4 py-2 text-sm font-medium transition ${
                  label === 'ថ្ងៃនេះ'
                    ? 'bg-[var(--dp-green-950)] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. KPI Cards - each card separate */}
      <div className="grid gap-4 sm:grid-cols-3">
        {kpiCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className={`rounded-[20px] p-5 shadow-[var(--dp-shadow-card)] ${card.bg}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium opacity-80">{card.title}</p>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${card.bg === 'bg-[var(--dp-green-950)] text-white' ? 'bg-white/10' : 'bg-[var(--dp-lime-100)]'} text-current`}>
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">{card.value}</p>
              <p className={`mt-1 text-xs ${card.bg === 'bg-[var(--dp-green-950)] text-white' ? 'text-[var(--dp-lime-100)]' : 'text-slate-500'}`}>{card.subtitle}</p>
            </div>
          )
        })}
      </div>

      {/* 3. Sales Performance Chart */}
      <section className="rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">ការអនុវត្តការលក់</h2>
            <p className="mt-1 text-sm text-slate-500">ទិន្នន័យតាមម៉ោង</p>
          </div>
          <button className="rounded-[10px] bg-[var(--dp-green-950)] px-4 py-2 text-sm font-medium text-white">
            <TrendingUp size={16} className="inline mr-1" />
            ថ្មី
          </button>
        </div>
        <div className="mt-6 h-[240px] rounded-[16px] bg-[#F8F9FA] p-4">
          <svg viewBox="0 0 720 200" className="h-full w-full">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="40" y1={y} x2="700" y2={y} stroke="#E7E8E9" strokeWidth="1" />
            ))}
            <path d="M40 160 C120 140 200 120 280 100 C360 80 440 90 520 70 C600 50 660 60 700 50 L700 190 L40 190 Z" fill="url(#areaGrad)" />
            <path d="M40 160 C120 140 200 120 280 100 C360 80 440 90 520 70 C600 50 660 60 700 50" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            {[40, 150, 260, 370, 480, 590, 700].map((cx, i) => {
              const cy = [160, 140, 120, 100, 80, 70, 50][i]
              return <circle key={cx} cx={cx} cy={cy} r="5" fill="#16A34A" stroke="white" strokeWidth="2" />
            })}
            {['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM'].map((label, i) => (
              <text key={label} x={[40, 150, 260, 370, 480, 590, 700][i]} y="190" textAnchor="middle" fontSize="11" fill="#666">{label}</text>
            ))}
            {['$0', '$500', '$1,000', '$1,500'].map((label, i) => (
              <text key={label} x="32" y={[185, 145, 105, 65][i]} textAnchor="end" fontSize="11" fill="#666">{label}</text>
            ))}
          </svg>
        </div>
      </section>

      {/* 4. Order Status Summary - each card separate */}
      <div className="grid gap-4 sm:grid-cols-3">
        {orderStatusCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="flex items-center gap-4 rounded-[20px] bg-[var(--dp-lime-100)] p-5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[var(--dp-green-950)]">
                <Icon size={28} />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
                <p className="mt-1 text-3xl font-bold text-[var(--dp-green-950)]">{card.count}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 5 & 6. Payment Status + Order Source Analytics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <h3 className="text-base font-semibold text-slate-900">ស្ថានភាពទូទាត់</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-[140px] w-[140px] shrink-0">
              <DonutChart data={paymentStatusData} />
            </div>
            <div className="flex-1 space-y-3">
              {paymentStatusData.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600">{d.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-slate-900">{d.value}%</span>
                    <span className="ml-2 text-xs text-slate-500">{d.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <h3 className="text-base font-semibold text-slate-900">ប្រភពការបញ្ជាទិញ</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-[140px] w-[140px] shrink-0">
              <DonutChart data={orderSourceData} />
            </div>
            <div className="flex-1 space-y-3">
              {orderSourceData.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600">{d.label}</span>
                  </div>
                  <span className="font-medium text-slate-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 7. Best-Selling Products */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">ទំនិញលក់ដាច់</h3>
            <button className="rounded-[10px] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">លម្អិត</button>
          </div>
          <div className="mt-5 space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-3">
                <ProductImagePlaceholder name={product.name} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm font-medium text-slate-900">{product.sold}</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[var(--dp-green-950)]" style={{ width: `${product.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">ទំនិញជិតអស់ស្តុក</h3>
            <button className="rounded-[10px] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">លម្អិត</button>
          </div>
          <div className="mt-5 space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-3">
                <ProductImagePlaceholder name={product.name} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">សល់: {product.stock}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${product.statusColor}`}>
                  {product.status === 'Low Stock' ? 'ជិតអស់' : 'អស់ស្តុក'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">អតិថិជនពេញចិត្ត</h3>
            <button className="rounded-[10px] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">លម្អិត</button>
          </div>
          <div className="mt-5 space-y-4">
            {topCustomers.map((customer) => (
              <div key={customer.name} className="flex items-center gap-3">
                <AvatarPlaceholder name={customer.name} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{customer.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{customer.orders} ការកម្មង់</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{customer.spent}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
  )

}