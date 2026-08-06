import { useTranslation } from 'react-i18next'

interface ProductDescriptionProps {
  description?: string
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  const { t } = useTranslation('productDetail')

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-4 sm:p-5">
      <h3 className="font-semibold text-[#191C1D] text-sm sm:text-base">{t('aboutProduct')}</h3>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#404941] leading-relaxed">
        {description || t('noDescription') || 'No product description provided.'}
      </p>
    </div>
  )
}
