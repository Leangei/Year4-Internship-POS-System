import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ProductHeaderProps {
  total: number
}

export default function ProductHeader({ total }: ProductHeaderProps) {
  const { t } = useTranslation('product')
  const navigate = useNavigate()

  return (
    <header className="flex flex-col gap-2 lg:gap-4 lg:flex-row lg:items-start lg:justify-between rounded-[20px] border border-[var(--dp-line)] bg-white p-3 lg:p-5 shadow-[var(--dp-shadow-card)]">
      <div className="flex-1 min-w-0">
        <h1 className="m-0 flex items-center gap-2 text-[18px] lg:text-[24px] leading-[1.2] font-bold text-[#00351B]">
          <span className="text-[1.2em] leading-none" aria-hidden="true">📦</span>
          <span>{t('title')}</span>
        </h1>
        <p className="mt-0.5 text-xs lg:text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-muted)]">{t('description')}</p>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 w-full lg:w-auto">
        <span className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full bg-[var(--dp-chip)] text-[var(--dp-body)] text-xs lg:text-sm leading-[var(--dp-lh-sm)] font-medium whitespace-nowrap">
          {t('totalProducts')}: <span className="font-bold text-[var(--dp-ink)] tabular-nums">{total}</span>
        </span>
        <button
          type="button"
          onClick={() => navigate('/shopOwner/products/new')}
          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-1.5 lg:py-3 rounded-full bg-[var(--dp-green-900)] text-white text-xs lg:text-sm leading-[var(--dp-lh-sm)] font-semibold shadow-[var(--dp-shadow-cta)] cursor-pointer font-[inherit] border-none transition-[background] duration-150 hover:bg-[var(--dp-green-800)] active:bg-[var(--dp-green-700)]"
        >
          <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
            <Plus size={16} strokeWidth={2} />
          </span>
          <span className="inline-flex items-center">{t('createProduct')}</span>
        </button>
      </div>
    </header>
  )
}
