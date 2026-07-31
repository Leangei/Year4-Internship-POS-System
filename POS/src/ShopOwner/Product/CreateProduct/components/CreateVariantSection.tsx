import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function CreateVariantSection() {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="cat-hint cat-hint--btn mt-4 w-full"
      onClick={() => navigate('/shopOwner/products/variants')}
    >
      <div className="cat-hint__title">
        {t('variantHintTitle') || 'Add size, color, and stock later'}
      </div>

      <span className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-[#9AF672] bg-[#9AF672] px-4 py-2 font-medium text-[var(--dp-green-900)]">
        <Plus size={15} strokeWidth={2.4} />
        <span>
          {t('size') || 'ទំហំ'}, {t('color') || 'ពណ៌'}, {t('stock') || 'ស្តុក'}
        </span>
      </span>

      <p className="cat-hint__note mt-3">
        {t('variantHintMessage') || 'Save the product first — size, color, and stock will be added on the next screen.'}
      </p>
    </button>
  )
}