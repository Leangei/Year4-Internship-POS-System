import { useState } from 'react'
import { Clock, Wallet, Package, DollarSign, Box, Truck, CreditCard, Calendar, type LucideIcon } from 'lucide-react'
import DashboardKpiGrid from './DashboardKpiGrid'
import DashboardChart from './DashboardChart.tsx'

type DashboardRange = 'ថ្ងៃនេះ' | 'សប្តាហ៍នេះ' | 'ខែនេះ'
type DashboardVariant = {
  kpiCards: {
    title: string
    value: string
    icon: LucideIcon
    bg: string
    subtitle: string
  }[]
  chartData: { label: string; value: number }[]
  chartSubtitle: string
}

const rangeOptions: DashboardRange[] = ['ថ្ងៃនេះ', 'សប្តាហ៍នេះ', 'ខែនេះ']

const dashboardVariants: Record<DashboardRange, DashboardVariant> = {
  'ថ្ងៃនេះ': {
    kpiCards: [
      {
        title: 'ចំណូលសរុប',
        value: '$12,450.00',
        icon: Wallet,
        bg: 'bg-[#064E2B] text-white',
        subtitle: '+15% ពីខែមុន',
      },
      {
        title: 'ការកម្មង់សរុប',
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
    ],
    chartData: [
      { label: '6AM', value: 15 },
      { label: '7AM', value: 28 },
      { label: '8AM', value: 45 },
      { label: '9AM', value: 72 },
      { label: '10AM', value: 95 },
      { label: '11AM', value: 120 },
      { label: '12PM', value: 110 },
      { label: '1PM', value: 85 },
      { label: '2PM', value: 100 },
      { label: '3PM', value: 130 },
      { label: '4PM', value: 155 },
      { label: '5PM', value: 170 },
      { label: '6PM', value: 140 },
    ],
    chartSubtitle: 'ស្ថិតិប្រចាំថ្ងៃសម្រាប់ថ្ងៃនេះ',
  },
  'សប្តាហ៍នេះ': {
    kpiCards: [
      {
        title: 'ចំណូលសរុប',
        value: '$78,340.00',
        icon: Wallet,
        bg: 'bg-[#064E2B] text-white',
        subtitle: '+12% ពីសប្តាហ៍មុន',
      },
      {
        title: 'ការកម្មង់សរុប',
        value: '912',
        icon: Package,
        bg: 'bg-white text-slate-900',
        subtitle: '47 កំពុងរង់ចាំ',
      },
      {
        title: 'តម្លៃមធ្យមក្នុងមួយការកម្មង់',
        value: '$85.92',
        icon: DollarSign,
        bg: 'bg-white text-slate-900',
        subtitle: 'សប្តាហ៍នេះ',
      },
    ],
    chartData: [
      { label: 'ច័ន្ទ', value: 650 },
      { label: 'អង្គារ', value: 820 },
      { label: 'ពុធ', value: 700 },
      { label: 'ព្រហស្បតិ៍', value: 950 },
      { label: 'សុក្រ', value: 1_090 },
      { label: 'សៅរ៍', value: 1_230 },
      { label: 'អាទិត្យ', value: 980 },
    ],
    chartSubtitle: 'ស្ថិតិប្រចាំសប្តាហ៍នេះ',
  },
  'ខែនេះ': {
    kpiCards: [
      {
        title: 'ចំណូលសរុប',
        value: '$312,800.00',
        icon: Wallet,
        bg: 'bg-[#064E2B] text-white',
        subtitle: '+18% ពីខែមុន',
      },
      {
        title: 'ការកម្មង់សរុប',
        value: '3,540',
        icon: Package,
        bg: 'bg-white text-slate-900',
        subtitle: '120 កំពុងរង់ចាំ',
      },
      {
        title: 'តម្លៃមធ្យមក្នុងមួយការកម្មង់',
        value: '$88.33',
        icon: DollarSign,
        bg: 'bg-white text-slate-900',
        subtitle: 'ខែនេះ',
      },
    ],
    chartData: [
      { label: 'សប្តាហ៍ 1', value: 2_800 },
      { label: 'សប្តាហ៍ 2', value: 3_100 },
      { label: 'សប្តាហ៍ 3', value: 2_950 },
      { label: 'សប្តាហ៍ 4', value: 3_320 },
    ],
    chartSubtitle: 'ស្ថិតិប្រចាំខែនេះ',
  },
}

const orderStatusCards = [
  { label: 'មិនទាន់បង់ប្រាក់', count: 12, icon: CreditCard },
  { label: 'មិនទាន់វេចខ្ចប់', count: 8, icon: Box },
  { label: 'មិនទាន់ដឹកជញ្ជូន', count: 5, icon: Truck },
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
  { name: 'Doir Lipstick', sold: 102, progress: 100, image: '/src/assets/product/dior lipstick.svg' },
  { name: 'Top T-shirt', sold: 90, progress: 88, image: '/src/assets/product/t-shirt.svg' },
  { name: 'Pink Pant', sold: 76, progress: 75, image: '/src/assets/product/pink pant.svg' },
  { name: 'Cap', sold: 50, progress: 50, image: '/src/assets/product/cap.svg' },
  { name: 'P-Shoe', sold: 30, progress: 30, image: '/src/assets/product/p-shoe.svg' },
]

const lowStockProducts = [
  { name: 'Doir Lipstick', stock: 5, status: 'Low Stock', statusColor: 'bg-amber-500', image: '/src/assets/product/dior lipstick.svg' },
  { name: 'Top T-shirt', stock: 2, status: 'Low Stock', statusColor: 'bg-amber-500', image: '/src/assets/product/t-shirt.svg' },
  { name: 'Pink Pant', stock: 0, status: 'Out of Stock', statusColor: 'bg-red-500', image: '/src/assets/product/pink pant.svg' },
  { name: 'Cap', stock: 8, status: 'Low Stock', statusColor: 'bg-amber-500', image: '/src/assets/product/cap.svg' },
  { name: 'P-Shoe', stock: 3, status: 'Low Stock', statusColor: 'bg-amber-500', image: '/src/assets/product/p-shoe.svg' },
]

const topCustomers = [
  { name: 'គីម ឆេង', orders: 15, spent: '$1,250.00', image: '/src/assets/customer/គីម ឆេង.svg' },
  { name: 'គីម តារ៉ា', orders: 12, spent: '$980.00', image: '/src/assets/customer/គីម តារ៉ា.svg' },
  { name: 'គីម សុខ', orders: 10, spent: '$875.00', image: '/src/assets/customer/គីម សុខ.svg' },
  { name: 'សុខ កញ្ញា', orders: 8, spent: '$720.00', image: '/src/assets/customer/សុខ កញ្ញា.svg' },
  { name: 'សុខ នីតា', orders: 6, spent: '$540.00', image: '/src/assets/customer/សុខ នីតា.svg' },
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

function ProductImage({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      className="h-10 w-10 shrink-0 rounded-[10px] object-cover bg-[#F8F9FA]"
    />
  )
}

function AvatarImage({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      className="h-10 w-10 shrink-0 rounded-full object-cover bg-[#F8F9FA]"
    />
  )
}

export default function DashboardHome() {
  const [selectedRange, setSelectedRange] = useState<DashboardRange>('ថ្ងៃនេះ')
  const currentVariant = dashboardVariants[selectedRange]

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Dashboard Summary */}
      <section className="rounded-[24px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2" style={{ fontSize: '20px', fontWeight: 700, color: '#00351B' }}>
              <Calendar size={20} />
              <span>{selectedRange}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--dp-lime-100)] px-4 py-2 text-sm font-medium text-[var(--dp-green-950)]">
              {selectedRange === 'សប្តាហ៍នេះ' ? (
                <Calendar size={16} />
              ) : (
                <Clock size={16} />
              )}
              <span>
                {selectedRange === 'សប្តាហ៍នេះ'
                  ? '24 តុលា 2023 - 31 តុលា 2023'
                  : selectedRange === 'ខែនេះ'
                  ? 'ខែ តុលា'
                  : '07:00 AM – 06:00 PM'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {rangeOptions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedRange(label)}
                className={`rounded-[10px] px-4 py-2 text-sm font-medium transition ${
                  label === selectedRange
                    ? 'bg-[#BAF911] text-[#00351B]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <DashboardKpiGrid cards={currentVariant.kpiCards} />

      {/* 3. Sales Performance Chart */}
      <DashboardChart
        title="ស្ថិតិនៃការលក់"
        subtitle={currentVariant.chartSubtitle}
        data={currentVariant.chartData}
        selectedRange={selectedRange}
        rangeOptions={rangeOptions}
        onRangeChange={(range) => setSelectedRange(range as DashboardRange)}
      />

      {/* 4. Order Status Summary */}
      <section className="rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
        <h3 className="text-base font-semibold text-slate-900">ត្រូវចាត់វិធានការ</h3>
        <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-3">
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
      </section>

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
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="h-full rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">ទំនិញលក់ដាច់</h3>
            <button className="rounded-[10px] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">លម្អិត</button>
          </div>
          <div className="mt-5 space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-3">
                <ProductImage src={product.image} name={product.name} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm font-medium text-slate-900">{product.sold}</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#9AF672]" style={{ width: `${product.progress}%` }} />
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
                <ProductImage src={product.image} name={product.name} />
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
            <h3 className="text-base font-semibold text-slate-900">អតិថិជនចំណាយច្រើនជាងគេ</h3>
            <button className="rounded-[10px] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">លម្អិត</button>
          </div>
          <div className="mt-5 space-y-4">
            {topCustomers.map((customer) => (
              <div key={customer.name} className="flex items-center gap-3">
                <AvatarImage src={customer.image} name={customer.name} />
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