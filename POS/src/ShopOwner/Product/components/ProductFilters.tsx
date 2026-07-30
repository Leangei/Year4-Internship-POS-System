import { Search, List, Shirt, Sparkles, Footprints, Flower } from 'lucide-react'
import type { TFunction } from 'i18next'

interface CategoryOption {
  value: string
  label: string
  icon: 'all' | 'clothing' | 'cosmetics' | 'shoes' | 'accessories'
}

interface ProductFiltersProps {
  query: string
  setQuery: (q: string) => void
  categoryFilter: string
  setCategoryFilter: (key: string) => void
  categoryOptions: readonly CategoryOption[]
  sortKey: string
  setSortKey: (key: string) => void
  sortOptions: readonly string[]
  t: TFunction
}

const categoryIcons: Record<CategoryOption['icon'], React.ReactNode> = {
  all: <List size={16} strokeWidth={1.9} />,
  clothing: <Shirt size={16} strokeWidth={1.9} />,
  cosmetics: <Sparkles size={16} strokeWidth={1.9} />,
  shoes: <Footprints size={16} strokeWidth={1.9} />,
  accessories: <Flower size={16} strokeWidth={1.9} />,
}

export default function ProductFilters({
  query,
  setQuery,
  categoryFilter,
  setCategoryFilter,
  categoryOptions,
  sortKey,
  setSortKey,
  sortOptions,
  t,
}: ProductFiltersProps) {
  return (
    <>
      {/* ── Mobile: Search + Sort in same row ── */}
      <div className="lg:hidden flex items-center gap-2">
        {/* Search */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5 bg-white border border-[var(--dp-line)] rounded-[var(--dp-r-field)] px-3 py-1.5">
          <Search size={13} strokeWidth={2} className="text-[var(--dp-muted)] flex-shrink-0" />
          <input
            type="search"
            className="flex-1 min-w-0 border-none bg-transparent font-[inherit] text-xs leading-[1.4] text-[var(--dp-ink)] outline-none p-0 placeholder:text-[var(--dp-muted)]"
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {/* Sort */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <label className="text-[10px] leading-[1.4] text-[var(--dp-muted)] whitespace-nowrap" htmlFor="cat-sort-mobile">{t('sortBy')}</label>
          <span className="relative inline-flex items-center">
            <select
              id="cat-sort-mobile"
              className="appearance-none px-2 py-1.5 pr-6 rounded-full border border-[var(--dp-line)] bg-white font-[inherit] text-[11px] leading-[1.4] text-[var(--dp-ink)] cursor-pointer outline-none min-w-[90px]"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {t(option)}
                </option>
              ))}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--dp-muted)] block flex-shrink-0">
              <path d="M5 9l7 7 7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Mobile: Category Chips below ── */}
      <div className="lg:hidden noscroll flex gap-1.5 overflow-x-auto">
        {categoryOptions.map((option) => {
          const isActive = categoryFilter === option.value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold leading-[1.4] cursor-pointer flex-shrink-0 whitespace-nowrap border ${
                isActive
                  ? 'bg-[var(--dp-ink)] border-[var(--dp-ink)] text-white'
                  : 'bg-white border-[var(--dp-line)] text-[var(--dp-muted)]'
              }`}
              onClick={() => setCategoryFilter(option.value)}
            >
              <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">{categoryIcons[option.icon]}</span>
              <span className="inline-flex items-center">{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Desktop: Search + Filter Toolbar (hidden on mobile) ── */}
      <div className="hidden lg:block">
        {/* Search Bar */}
        <div className="relative flex items-center gap-2 w-full bg-white border border-[var(--dp-line)] rounded-[var(--dp-r-field)] px-4 py-2 transition-[border-color] duration-150 focus-within:border-[var(--dp-green-500)]">
          <span className="inline-flex items-center justify-center flex-shrink-0 text-[var(--dp-muted)] leading-none">
            <Search size={13} strokeWidth={2} />
          </span>
          <input
            type="search"
            className="flex-1 min-w-0 border-none bg-transparent font-[inherit] text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-ink)] outline-none p-0 placeholder:text-[var(--dp-muted)]"
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col gap-4 mt-4 lg:flex-row lg:items-center bg-white rounded-[var(--dp-r-card)] p-4 shadow-[var(--dp-shadow-card)]">
          {/* Category Chips */}
          <div className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto scrollbar-none" role="group" aria-label={t('category')}>
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={categoryFilter === option.value}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm leading-[var(--dp-lh-sm)] font-medium cursor-pointer whitespace-nowrap font-[inherit] transition-all duration-150 ${
                  categoryFilter === option.value
                    ? 'bg-[var(--dp-green-900)] border-[var(--dp-green-900)] text-white'
                    : 'bg-white border-[var(--dp-line)] text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)] hover:border-[var(--dp-line-strong)]'
                }`}
                onClick={() => setCategoryFilter(option.value)}
              >
                <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">{categoryIcons[option.icon]}</span>
                <span className="inline-flex items-center">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex-shrink-0 flex items-center gap-2 w-full lg:w-auto">
            <label className="text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-muted)] whitespace-nowrap" htmlFor="cat-sort">{t('sortBy')}</label>
            <span className="relative inline-flex items-center">
              <select
                id="cat-sort"
                className="appearance-none px-3 py-2 pr-8 rounded-full border border-[var(--dp-line)] bg-white font-[inherit] text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-ink)] cursor-pointer outline-none transition-[border-color] duration-150 w-full lg:min-w-[140px] hover:border-[var(--dp-line-strong)] focus:border-[var(--dp-green-500)]"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(option)}
                  </option>
                ))}
              </select>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--dp-muted)] block flex-shrink-0">
                <path d="M5 9l7 7 7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
