type ChartDataPoint = {
  label: string
  value: number
}

type DashboardChartProps = {
  title: string
  subtitle: string
  buttonLabel: string
  data: ChartDataPoint[]
}

export default function DashboardChart({ title, subtitle, buttonLabel, data }: DashboardChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 0)
  const minValue = 0
  const minX = 50
  const maxX = 700
  const minY = 210
  const maxY = 10
  const xScale = data.length > 1 ? (maxX - minX) / (data.length - 1) : 0
  const yScale = maxValue > minValue ? (minY - maxY) / (maxValue - minValue) : 0

  const coords = data.map((point, index) => ({
    x: minX + index * xScale,
    y: minY - (point.value - minValue) * yScale,
    point,
  }))

  const areaPath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(' ') + ` L${coords[coords.length - 1].x.toFixed(1)} ${minY} L${coords[0].x.toFixed(1)} ${minY} Z`
  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(' ')

  return (
    <section className="rounded-[20px] bg-white p-6 shadow-[var(--dp-shadow-card)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <button className="rounded-[10px] bg-[var(--dp-green-950)] px-4 py-2 text-sm font-medium text-white">
          {buttonLabel}
        </button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-[16px] bg-[#F8F9FA] p-4">
        <svg viewBox="0 0 720 240" className="h-[280px] min-w-[720px] w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#16A34A" floodOpacity="0.3" />
            </filter>
          </defs>

          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
            const y = 210 - i * 20
            const val = i * 20
            return (
              <g key={i}>
                <line
                  x1="50"
                  y1={y}
                  x2="700"
                  y2={y}
                  stroke={val === 0 ? '#D1D5DB' : '#E7E8E9'}
                  strokeWidth={val === 0 ? '1.5' : '1'}
                  strokeDasharray={val === 0 ? '0' : '4,4'}
                />
                <text
                  x="44"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9CA3AF"
                  fontFamily="'Noto Sans Khmer', sans-serif"
                >
                  ${val}
                </text>
              </g>
            )
          })}

          {coords.map((coord, index) => (
            <g key={coord.point.label}>
              <text
                x={coord.x}
                y="230"
                textAnchor="middle"
                fontSize="10"
                fill="#9CA3AF"
                fontFamily="'Noto Sans Khmer', sans-serif"
              >
                {coord.point.label}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)" opacity="0.7" />
          {coords.map((coord) => (
            <g key={coord.point.label}>
              <circle cx={coord.x} cy={coord.y} r="6" fill="white" stroke="#16A34A" strokeWidth="2.5" />
              <circle cx={coord.x} cy={coord.y} r="2.5" fill="#16A34A" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
