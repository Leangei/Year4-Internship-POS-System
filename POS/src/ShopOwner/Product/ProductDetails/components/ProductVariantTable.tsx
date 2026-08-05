import { useTranslation } from 'react-i18next'
import type { ProductVariant } from '../../Productlist/components/ProductTypes'

interface ProductVariantTableProps {
  variants: ProductVariant[]
  price?: string
}

export default function ProductVariantTable({ variants, price = '' }: ProductVariantTableProps) {
  const { t } = useTranslation('productDetail')

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-5">
      <h2 className="text-sm font-semibold text-[var(--dp-ink)] mb-5">
        {t('typesAndStock')}
      </h2>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-[520px] w-full text-sm">
          <thead>
            <tr className="border-b bg-[#F3F4F3] text-left">
              <th className="p-3 font-medium text-[var(--dp-body)] whitespace-nowrap">
                {t('variant')}
              </th>
              <th className="p-3 font-medium text-[var(--dp-body)] text-right whitespace-nowrap">
                {t('price')}
              </th>
              <th className="p-3 font-medium text-[var(--dp-body)] text-right whitespace-nowrap">
                {t('stock')}
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr className="border-b">
                <td colSpan={3} className="p-3 text-center text-sm text-[var(--dp-muted)]">
                  {t('noVariants') || 'No variants available'}
                </td>
              </tr>
            ) : (
              variants.map((variant, index) => (
                <tr key={`${variant.label}-${index}`} className="border-b">
                  <td className="p-2">
                    <input
                      className="w-full px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm outline-none focus:border-[var(--dp-green-500)] transition-colors"
                      value={variant.label}
                      readOnly
                      aria-label={t('variant')}
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      className="w-20 px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)] transition-colors"
                      value={price}
                      readOnly
                      aria-label={t('price')}
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      min={0}
                      step={1}
                      inputMode="numeric"
                      className="w-16 px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)] transition-colors"
                      value={variant.stock}
                      readOnly
                      aria-label={t('stock')}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Row Layout */}
      <div className="block lg:hidden overflow-x-auto">
        <div className="min-w-[420px] rounded-2xl border border-[var(--dp-line)] bg-[var(--dp-surface-2)] p-2">
          <div className="flex items-start gap-2 pb-2">
            <div className="min-w-[200px]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)]">
                {t('variant')}
              </div>
            </div>
            <div className="min-w-[80px]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)] text-center">
                {t('price')}
              </div>
            </div>
            <div className="min-w-[68px]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)] text-center">
                {t('stock')}
              </div>
            </div>
          </div>

          {variants.length === 0 ? (
            <div className="mt-2 rounded-lg border border-[var(--dp-line)] bg-white p-3 text-center text-sm text-[var(--dp-muted)]">
              {t('noVariants') || 'No variants available'}
            </div>
          ) : (
            variants.map((variant, index) => (
              <div key={`${variant.label}-${index}`} className="mt-2 flex items-start gap-2">
                <div className="min-w-[200px]">
                  <input
                    className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm outline-none focus:border-[var(--dp-green-500)]"
                    value={variant.label}
                    readOnly
                    aria-label={t('variant')}
                  />
                </div>
                <div className="min-w-[80px]">
                  <input
                    className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)]"
                    value={price}
                    readOnly
                    aria-label={t('price')}
                  />
                </div>
                <div className="min-w-[68px]">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)]"
                    value={variant.stock}
                    readOnly
                    aria-label={t('stock')}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}