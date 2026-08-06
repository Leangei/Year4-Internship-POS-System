import { useTranslation } from 'react-i18next'
import type { ProductVariant } from '../../Productlist/components/ProductTypes'

interface ProductVariantTableProps {
  variants: ProductVariant[]
  price?: string
}

export default function ProductVariantTable({ variants, price = '' }: ProductVariantTableProps) {
  const { t } = useTranslation('productDetail')

  // Collect all attribute keys across variants (e.g. size, color, volume)
  const attributeKeys = Array.from(
    new Set(
      variants.flatMap((v) => (v.attributes ? Object.keys(v.attributes) : [])),
    ),
  )

  // Translate attribute keys to display labels (size → ទំហំ, color → ពណ៌, volume → ចំណុះ)
  const getAttributeLabel = (key: string) => {
    if (key === 'size') return t('size') || 'Size'
    if (key === 'color') return t('color') || 'Color'
    if (key === 'volume') return t('volume') || 'Volume'
    return key
  }

  const getStatusLabel = (stock: number) => {
    if (stock <= 0) return t('outOfStock') || 'Out of stock'
    if (stock <= 5) return t('lowStock') || 'Low stock'
    return t('inStock') || 'In stock'
  }

  const getStatusClass = (stock: number) => {
    if (stock <= 0) return 'bg-[var(--dp-danger-tint)] text-[var(--dp-danger-ink)]'
    if (stock <= 5) return 'bg-[var(--dp-warn-tint)] text-[var(--dp-warn-ink)]'
    return 'bg-[var(--dp-lime-100)] text-[var(--dp-ok-ink)]'
  }

  return (
    <div className="dp-card" style={{ '--dp-card-radius': 'var(--dp-r-card)' } as React.CSSProperties}>
      <h2 className="cat-cardtitle">{t('typesAndStock')}</h2>

      <div className="dp-table">
        <div className="dp-table__scroll">
          <table className="dp-table__el" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                {attributeKeys.length > 0 ? (
                  attributeKeys.map((key) => (
                    <th key={key} scope="col" className="dp-table__th">
                      {getAttributeLabel(key)}
                    </th>
                  ))
                ) : (
                  <th scope="col" className="dp-table__th">
                    {t('variant')}
                  </th>
                )}
                <th scope="col" className="dp-table__th is-right">
                  {t('price')}
                </th>
                <th scope="col" className="dp-table__th is-right">
                  {t('stock')}
                </th>
                <th scope="col" className="dp-table__th is-right">
                  {t('sold')}
                </th>
                <th scope="col" className="dp-table__th">
                  {t('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.length === 0 ? (
                <tr className="dp-table__tr">
                  <td colSpan={5} className="dp-table__td text-center text-[var(--dp-muted)]">
                    {t('noVariants') || 'No variants available'}
                  </td>
                </tr>
              ) : (
                variants.map((variant, index) => (
                  <tr key={`${variant.label}-${index}`} className="dp-table__tr">
                    {attributeKeys.length > 0 ? (
                      attributeKeys.map((key) => (
                        <td key={key} className="dp-table__td">
                          {variant.attributes?.[key] ?? ''}
                        </td>
                      ))
                    ) : (
                      <td className="dp-table__td">{variant.label}</td>
                    )}
                    <td className="dp-table__td is-right">
                      <span className="cat-vprice dp-tnum">
                        {variant.price ? `$${variant.price}` : price}
                      </span>
                    </td>
                    <td className="dp-table__td is-right">
                      <span className="dp-tnum">{variant.stock}</span>
                    </td>
                    <td className="dp-table__td is-right">
                      <span className="dp-tnum">0</span>
                    </td>
                    <td className="dp-table__td">
                      <span className={`cat-vstatus inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(variant.stock)}`}>
                        {getStatusLabel(variant.stock)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}