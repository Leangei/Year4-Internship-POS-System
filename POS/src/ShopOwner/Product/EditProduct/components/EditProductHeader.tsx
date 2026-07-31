import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface EditProductHeaderProps {
  productName: string
  sku: string
  onCancel: () => void
  onSave: () => void
}

export default function EditProductHeader({
  productName,
  sku,
  onCancel,
  onSave,
}: EditProductHeaderProps) {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t('back') || 'ត្រឡប់ក្រោយ'}
          className="
            inline-flex items-center justify-center
            w-8 h-8 rounded-lg
            text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)]
            transition-colors
          "
        >
          <ArrowLeft size={15} strokeWidth={1.9} />
        </button>
        <span className="text-xs font-medium text-[var(--dp-muted)] tabular-nums">
          #{sku}
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] sm:text-[24px] leading-[1.35] font-bold text-[var(--dp-green-900)]">
            {t('editProduct')} : {productName}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1 sm:flex-none
              inline-flex items-center justify-center px-4 sm:px-5 py-2.5
              rounded-full border border-[var(--dp-line)]
              bg-white text-[var(--dp-body)]
              font-semibold text-sm
              hover:bg-[var(--dp-surface-2)]
              transition-colors
            "
          >
            {t('cancel') || 'បោះបង់'}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="
              flex-1 sm:flex-none
              inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5
              rounded-full bg-[var(--dp-green-900)] text-white
              font-semibold text-sm
              hover:bg-[var(--dp-green-800)]
              transition-colors
            "
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="block flex-shrink-0">
              <path d="M6 3h8l4 4v14H6V3Z" />
              <path d="M14 3v4h4M9 12h6M9 16h6" />
            </svg>
            <span>{t('save') || 'រក្សាទុក'}</span>
          </button>
        </div>
      </header>
    </>
  )
}