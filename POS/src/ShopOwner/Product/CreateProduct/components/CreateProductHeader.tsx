import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface CreateProductHeaderProps {
  productName: string
  onCancel: () => void
  onSave: () => void
}

export default function CreateProductHeader({
  productName,
  onCancel,
  onSave,
}: CreateProductHeaderProps) {
  const { t } = useTranslation(['product', 'productDetail'])
  const navigate = useNavigate()

  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t('back', { ns: 'productDetail' }) || 'Back'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--dp-body)] transition-colors hover:bg-[var(--dp-surface-2)]"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>

        <h1 className="text-[20px] font-bold leading-[1.3] text-[var(--dp-green-900)] sm:text-[24px]">
          {t('create.createProduct', { ns: 'product' }) || t('createProduct', { ns: 'product' }) || 'Create New Product'}: {productName}
        </h1>
      </div>

      {/* Right — hidden on mobile/tablet; mobile uses the bottom Save button instead */}
      <div className="hidden w-full items-center gap-2 xl:flex xl:w-auto">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full border border-[var(--dp-line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--dp-body)] transition-colors hover:bg-[var(--dp-surface-2)] sm:flex-none"
        >
          {t('cancel', { ns: 'productDetail' }) || 'Cancel'}
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--dp-green-900)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--dp-green-800)] sm:flex-none"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h8l4 4v14H6V3Z" />
            <path d="M14 3v4h4M9 12h6M9 16h6" />
          </svg>

          <span>{t('save', { ns: 'productDetail' }) || 'Save'}</span>
        </button>
      </div>
    </header>
  )
}