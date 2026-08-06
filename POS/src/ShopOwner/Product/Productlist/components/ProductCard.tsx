import { useTranslation } from 'react-i18next'
import { Pencil, Trash2, Tag, ChevronRight, Shirt, Sparkles, Footprints, Flower } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ProductItem } from './ProductTypes'
import { useNavigate } from 'react-router-dom'
import { getLowestVariantPrice } from '../../../../utils/productPrice'

const MAX_VISIBLE_VARIANTS = 4
const LOW_STOCK_THRESHOLD = 2

const imageModules = import.meta.glob('../../../../assets/product/*.{svg,png,jpg,jpeg}', { eager: true }) as Record<
  string,
  { default: string }
>

const imageMap = Object.entries(imageModules).reduce<Record<string, string>>((map, [path, module]) => {
  const fileName = path.split('/').pop() ?? ''
  map[fileName] = module.default
  return map
}, {})

interface ProductCardProps {
  product: ProductItem
  onDelete?: (id: string) => void
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const { t } = useTranslation('product')
  const navigate = useNavigate()

  const visibleVariants = product.variants.slice(0, MAX_VISIBLE_VARIANTS)
  const remainingCount = product.variants.length - MAX_VISIBLE_VARIANTS

  const imageSrc = (() => {
    if (!product.image) return ''
    // If it's an absolute URL, root-relative path, or data URI, use as-is
    if (/^https?:\/\//.test(product.image) || product.image.startsWith('/') || product.image.startsWith('data:')) {
      return product.image
    }
    return imageMap[product.image] || product.image
  })()

  const LOW_STOCK_COLOR = 'bg-[var(--dp-danger-tint)] text-[var(--dp-danger)] border-[color-mix(in_srgb,var(--dp-danger)_18%,#fff)]'
  const NORMAL_VARIANT_COLOR = 'bg-[var(--dp-surface-2)] text-[var(--dp-muted)] border-[var(--dp-line)]'

  const getCategoryLabel = (value: string) => {
    const normalized = value?.toLowerCase()

    switch (normalized) {
      case 'apparel':
      case 'clothes':
      case 'clothing':
        return t('list.clothing')
      case 'beauty':
      case 'cosmetics':
        return t('list.cosmetics')
      case 'footwear':
      case 'shoes':
        return t('list.shoes')
      case 'accessories':
        return t('list.accessories')
      default:
        return value || t('list.all')
    }
  }

  const CategoryIconComponent = (() => {
    switch (product.category?.toLowerCase()) {
      case 'apparel':
      case 'clothes':
      case 'clothing':
        return Shirt
      case 'beauty':
      case 'cosmetics':
        return Sparkles
      case 'footwear':
      case 'shoes':
        return Footprints
      case 'accessories':
        return Flower
      default:
        return Tag
    }
  })() as ComponentType<LucideProps>

  return (
    <>
      {/* ── Mobile Card ── */}
<div
  onClick={() =>
    navigate(`/shopOwner/products/${product.id}`)
  }
  className="lg:hidden ..."
  role="button"
  tabIndex={0}
  aria-label={product.name}
>
        <div className="flex gap-2.5">
          {/* Image */}
          <div
            className="w-[72px] h-[72px] rounded-[12px] flex-shrink-0 bg-cover bg-center border border-[var(--dp-line)]"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          {/* Info */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Name + Chevron */}
            <div className="flex items-start gap-1">
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[var(--dp-ink)] leading-[1.5] whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.name}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold leading-[1.4] text-[var(--dp-muted)] bg-[var(--dp-surface-2)] px-1.5 py-0.5 rounded-full">
                    <CategoryIconComponent size={10} strokeWidth={1.8} className="text-[var(--dp-green-600)]" />
                    {getCategoryLabel(product.category)}
                  </span>
                  <span className="tnum text-[10px] text-[var(--dp-faint)] tracking-[0.2px]">
                    #{product.sku.slice(0, 4).toUpperCase()}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} strokeWidth={1.7} className="text-[var(--dp-faint)] flex-shrink-0 mt-0.5" />
            </div>
            {/* Price + Stock */}
            <div className="mt-auto pt-1 flex items-baseline gap-1">
              <span className="tnum font-extrabold text-[var(--dp-ink)] tracking-[-0.5px] text-[16px]">
                {getLowestVariantPrice(product)}
              </span>
              <span className="text-[10px] text-[var(--dp-muted)] leading-[1.4] whitespace-nowrap">
                · {t('list.inStock')}: {product.stock}
              </span>
            </div>
          </div>
        </div>
        {/* Variants */}
        <div className="flex gap-1 flex-wrap mt-2">
          {visibleVariants.map((variant) => {
            const isLowStock = variant.stock <= LOW_STOCK_THRESHOLD
            return (
              <span
                key={variant.label}
                className={`tnum text-[10px] px-[7px] py-[2px] rounded-[6px] font-semibold leading-[1.4] whitespace-nowrap border ${
                  isLowStock ? LOW_STOCK_COLOR : NORMAL_VARIANT_COLOR
                }`}
              >
                {variant.label}: {variant.stock}
              </span>
            )
          })}
          {remainingCount > 0 && (
            <span className="tnum text-[10px] text-[var(--dp-muted)] self-center">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* ── Desktop Card (unchanged) ── */}
 <div
  onClick={() =>
    navigate(`/shopOwner/products/${product.id}`)
  }
  className="hidden lg:block bg-white rounded-[var(--dp-r-card)] shadow-[var(--dp-shadow-card)] overflow-hidden mb-4 w-full transition-shadow duration-150 hover:shadow-[var(--dp-shadow-pop)] cursor-pointer"
  role="button"
  tabIndex={0}
  aria-label={product.name}
>
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Product Image */}
          <div
            className="flex-shrink-0 self-start overflow-hidden relative bg-[var(--dp-surface-2)] w-full lg:w-auto"
            style={{ aspectRatio: '1 / 1', maxHeight: 'clamp(112px, 26vw, 240px)', width: 'clamp(112px, 26%, 240px)' }}
          >
            <img
              src={imageSrc}
              alt={`${product.name} — ${t('list.productImage')}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover block"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col gap-1 p-4 px-5">
            {/* Name + Price row */}
            <div className="flex items-baseline gap-3">
              <h3 className="flex-1 min-w-0 m-0 text-[var(--dp-fs-lg)] leading-[var(--dp-lh-lg)] font-bold text-[var(--dp-ink)] overflow-hidden text-ellipsis">
                {product.name}
              </h3>
              <span className="flex-shrink-0 text-[var(--dp-fs-lg)] leading-[var(--dp-lh-lg)] font-bold text-[var(--dp-ink)] tabular-nums">
                {getLowestVariantPrice(product)}
              </span>
            </div>

            {/* SKU */}
            <div className="tabular-nums text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-muted)] overflow-hidden text-ellipsis whitespace-nowrap">
              #{product.sku}
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-sm leading-[var(--dp-lh-sm)] text-[var(--dp-body)]">
              <CategoryIconComponent size={15} strokeWidth={1.7} className="text-[var(--dp-green-600)] block flex-shrink-0" />
              <span className="min-w-0 overflow-hidden text-ellipsis">{getCategoryLabel(product.category)}</span>
            </div>

            {/* Stock */}
            <div className="text-sm leading-[var(--dp-lh-sm)] font-normal text-[var(--dp-body)]">
              {t('list.inStock')} : <span className="tabular-nums">{product.stock}</span>
            </div>

            {/* Variants */}
            <div className="flex flex-wrap gap-2 mt-1">
              {visibleVariants.map((variant) => {
                const isLowStock = variant.stock <= LOW_STOCK_THRESHOLD
                return (
                  <span
                    key={variant.label}
                    title={isLowStock ? `${variant.label} · ${t('list.lowStock')} (≤ ${LOW_STOCK_THRESHOLD})` : variant.label}
                    className={`inline-flex items-center gap-[5px] px-3 py-1 rounded-full text-xs leading-[var(--dp-lh-xs)] font-medium ${
                      isLowStock
                        ? 'bg-[var(--dp-danger-tint)] text-[var(--dp-danger-ink)]'
                        : 'bg-[var(--dp-chip)] text-[var(--dp-body)]'
                    }`}
                  >
                    {variant.label}
                    <span className="tabular-nums">{variant.stock}</span>
                  </span>
                )
              })}
              {remainingCount > 0 && (
                <span className="self-center text-xs leading-[var(--dp-lh-xs)] text-[var(--dp-muted)] tabular-nums">
                  +{remainingCount}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto pt-3 lg:flex-row lg:justify-end lg:items-center">
              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation()
    navigate(`/shopOwner/products/${product.id}`)
  }}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    px-4
    py-2
    rounded-full
    bg-transparent
    text-[var(--dp-body)]
    text-sm
    font-semibold
    cursor-pointer
    border-none
    transition-[background]
    duration-150
    hover:bg-[var(--dp-chip)]
    flex-1
    lg:flex-none
  "
>
  <span className="inline-flex items-center">
    {t('list.productDetails')}
  </span>
</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); navigate(`/shopOwner/products/${product.id}/edit`) }} className="inline-flex items-center justify-center p-2 rounded-full bg-transparent border border-[var(--dp-line)] text-[var(--dp-body)] cursor-pointer font-[inherit] transition-[background,border-color] duration-150 hover:bg-[var(--dp-surface-2)] hover:border-[var(--dp-line-strong)]" aria-label={t('list.editProduct')}>
                <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                  <Pencil size={18} strokeWidth={1.9} />
                </span>
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onDelete?.(product.id) }} className="inline-flex items-center justify-center p-2 rounded-full bg-transparent text-[var(--dp-danger-ink)] cursor-pointer font-[inherit] border-none transition-[background] duration-150 hover:bg-[var(--dp-danger-tint)]" aria-label={t('list.delete')}>
                <span className="inline-flex items-center justify-center flex-shrink-0 leading-none">
                  <Trash2 size={18} strokeWidth={1.9} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}