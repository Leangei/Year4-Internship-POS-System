import { Tag, Shirt, Sparkles, Footprints, Flower } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ProductItem } from '../../Productlist/components/ProductTypes'
import { useTranslation } from 'react-i18next'
import { getVariantPriceRange } from '../../../../utils/productPrice'

interface ProductInfoCardProps {
  product: ProductItem
}

export default function ProductInfoCard({ product }: ProductInfoCardProps) {
  const { t } = useTranslation('productDetail')

  const CategoryIconComponent = (() => {
    switch (product.category) {
      case 'Apparel':
        return Shirt
      case 'Beauty':
        return Sparkles
      case 'Footwear':
        return Footprints
      case 'Accessories':
        return Flower
      default:
        return Tag
    }
  })() as ComponentType<LucideProps>

  const statusLabel =
    product.status === 'inStock'
      ? t('inStock')
      : product.status === 'lowStock'
      ? 'Low stock'
      : 'Out of stock'

  const categoryLabel = (() => {
    switch (product.category) {
      case 'Apparel':
        return t('clothing') || 'Clothing'
      case 'Beauty':
        return t('cosmetics') || 'Cosmetics'
      case 'Footwear':
        return t('shoes') || 'Shoes'
      case 'Accessories':
        return t('accessories') || 'Accessories'
      default:
        return product.category
    }
  })()

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-4 sm:p-5">
      <div className="flex justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-3xl font-bold text-[#00351B] break-words">{product.name}</h2>
          <p className="text-xs sm:text-sm text-[#666666]">#{product.sku}</p>
          <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-[#404941]">
            <CategoryIconComponent size={14} strokeWidth={1.7} className="text-[var(--dp-green-600)] shrink-0" />
            <span className="truncate">{categoryLabel}</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 whitespace-nowrap h-5 sm:h-6 rounded-full bg-[var(--dp-lime-100)] border border-[var(--dp-lime-400)] px-2 sm:px-3 text-[10px] sm:text-xs font-semibold text-[var(--dp-ok-ink)] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dp-green-500)]" />
          {statusLabel}
        </span>
      </div>

      <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-[#00351B]">{getVariantPriceRange(product)}</h2>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#666666]">{t('addedOn', { date: 'July 29, 2026' })}</p>
    </div>
  )
}