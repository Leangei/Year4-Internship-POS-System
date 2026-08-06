import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Trash2, X } from 'lucide-react'
import type { ProductVariant } from '../../Productlist/components/ProductTypes'

interface VariantRow {
  id: string
  size: string
  price: string
  stock: string
  custom: Record<string, string>
}

interface CustomColumn {
  id: string
  name: string
}

interface EditVariantTableProps {
  initialVariants?: ProductVariant[]
  onVariantsChange?: (variants: ProductVariant[]) => void
}

let colIdCounter = 0

const defaultVariants: VariantRow[] = []

export default function EditVariantTable({ initialVariants, onVariantsChange }: EditVariantTableProps) {
  const { t } = useTranslation('productDetail')

  // Build initial custom columns from existing variant attributes (excluding size)
  const buildInitialCols = (): CustomColumn[] => {
    if (!initialVariants || initialVariants.length === 0) return []
    const keys = new Set<string>()
    initialVariants.forEach((v) => {
      if (v.attributes) {
        Object.keys(v.attributes).forEach((key) => {
          if (key !== 'size') keys.add(key)
        })
      }
    })
    return Array.from(keys).map((key) => ({ id: `col-${++colIdCounter}`, name: key }))
  }

  const initialCols = buildInitialCols()

  const [variants, setVariants] = useState<VariantRow[]>(() =>
    (initialVariants && initialVariants.length > 0
      ? initialVariants.map((v, i) => {
          // If attributes exist, populate size + custom columns from them
          if (v.attributes) {
            const size = v.attributes.size ?? ''
            const custom: Record<string, string> = {}
            initialCols.forEach((col) => {
              custom[col.id] = v.attributes?.[col.name] ?? ''
            })
            return {
              id: `v-${i}`,
              size,
              price: v.price ?? '',
              stock: String(v.stock),
              custom,
            }
          }
          // Fallback: use the combined label
          return {
            id: `v-${i}`,
            size: v.label,
            price: v.price ?? '',
            stock: String(v.stock),
            custom: {},
          }
        })
      : defaultVariants) as VariantRow[],
  )
  const [customCols, setCustomCols] = useState<CustomColumn[]>(initialCols)
  // Only show the Size column if existing variants actually have a size attribute.
  // If there are no variants yet, hide it — the user adds it via the + Size button.
  const [showSize, setShowSize] = useState(() => {
    if (!initialVariants || initialVariants.length === 0) return false
    return initialVariants.some((v) => v.attributes?.size)
  })

  const emitVariants = (next: VariantRow[]) => {
    if (!onVariantsChange) return
    onVariantsChange(
      next.map((v) => {
        // Build structured attributes: size + custom columns (color, volume, etc.)
        // Use the column NAME (translated) as the attribute key, not the raw ID
        const attributes: Record<string, string> = {}
        if (v.size) attributes.size = v.size
        Object.entries(v.custom).forEach(([key, value]) => {
          if (!value) return
          const col = customCols.find((c) => c.id === key)
          const attrKey = col?.name || key
          attributes[attrKey] = value
        })

        // Combine size + all custom values (color, volume, etc.) into the label,
        // matching the create flow's format, e.g. "S / Black"
        const labelParts = [v.size, ...Object.values(v.custom).filter(Boolean)]
        return {
          label: labelParts.filter(Boolean).join(' / ') || 'Variant',
          stock: Number(v.stock) || 0,
          lowStock: Number(v.stock) > 0 && Number(v.stock) <= 5,
          price: v.price,
          attributes,
        } as ProductVariant
      }),
    )
  }

  // Sync the parent's variants state with the editor's initial variants on mount
  useEffect(() => {
    emitVariants(variants)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteRow = (id: string) => {
    setVariants((prev) => {
      const next = prev.filter((v) => v.id !== id)
      emitVariants(next)
      return next
    })
  }

  const handleChange = (id: string, field: string, value: string) => {
    setVariants((prev) => {
      const next = prev.map((v) => {
        if (v.id !== id) return v
        if (field === 'size' || field === 'price' || field === 'stock') {
          return { ...v, [field]: value }
        }
        return { ...v, custom: { ...v.custom, [field]: value } }
      })
      emitVariants(next)
      return next
    })
  }

  const handleAddRow = () => {
    const newId = `row-${Date.now()}`
    setVariants((prev) => {
      const next = [...prev, { id: newId, size: '', price: '', stock: '0', custom: {} }]
      emitVariants(next)
      return next
    })
  }

  const handleAddColumn = () => {
    const newColId = `col-${++colIdCounter}`
    setCustomCols((prev) => [...prev, { id: newColId, name: '' }])
    setVariants((prev) => {
      const next = prev.map((v) => ({
        ...v,
        custom: { ...v.custom, [newColId]: '' },
      }))
      // If there are no rows yet, add one so the user can start filling in data
      if (next.length === 0) {
        next.push({ id: `row-${Date.now()}`, size: '', price: '', stock: '0', custom: { [newColId]: '' } })
      }
      emitVariants(next)
      return next
    })
  }

  const handleAddStandardColumn = (name: string) => {
    if (!customCols.find((c) => c.name === name)) {
      const newColId = `col-${++colIdCounter}`
      setCustomCols((prev) => [...prev, { id: newColId, name }])
      setVariants((prev) => {
        const next = prev.map((v) => ({
          ...v,
          custom: { ...v.custom, [newColId]: '' },
        }))
        // If there are no rows yet, add one so the user can start filling in data
        if (next.length === 0) {
          next.push({ id: `row-${Date.now()}`, size: '', price: '', stock: '0', custom: { [newColId]: '' } })
        }
        emitVariants(next)
        return next
      })
    }
  }

  const handleDeleteCol = (colId: string) => {
    setCustomCols((prev) => prev.filter((c) => c.id !== colId))
    setVariants((prev) =>
      prev.map((v) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [colId]: _, ...rest } = v.custom
        return { ...v, custom: rest }
      })
    )
  }

  const handleDeleteSizeColumn = () => {
    setShowSize(false)
    setVariants((prev) =>
      prev.map((v) => ({ ...v, size: '' }))
    )
  }

  const handleColTitleChange = (colId: string, newName: string) => {
    setCustomCols((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, name: newName } : c))
    )
  }

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
              {showSize && (
                <th className="p-3 font-medium text-[var(--dp-body)] whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    <span>{t('size')}</span>
                    <button
                      type="button"
                      onClick={handleDeleteSizeColumn}
                      aria-label={`${t('delete') || 'លុប'} ${t('size') || 'Size'}`}
                      className="text-[var(--dp-muted)] hover:text-[var(--dp-danger)] transition-colors"
                    >
                      <X size={11} strokeWidth={2.6} />
                    </button>
                  </span>
                </th>
              )}
              {customCols.map((col) => (
                <th key={col.id} className="p-3 font-medium text-[var(--dp-body)] whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    <input
                      className="bg-transparent border-none outline-none w-20 text-sm font-medium text-[var(--dp-ink)]"
                      value={col.name}
                      onChange={(e) => handleColTitleChange(col.id, e.target.value)}
                      placeholder={t('colName') || 'ឈ្មោះប្រភេទ'}
                      aria-label={t('colName') || 'ឈ្មោះប្រភេទ'}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteCol(col.id)}
                      aria-label={`${t('delete') || 'លុប'} ${col.name || col.id}`}
                      className="text-[var(--dp-muted)] hover:text-[var(--dp-danger)] transition-colors"
                    >
                      <X size={11} strokeWidth={2.6} />
                    </button>
                  </span>
                </th>
              ))}
              <th className="p-3 font-medium text-[var(--dp-body)] text-right whitespace-nowrap">
                {t('price')}
              </th>
              <th className="p-3 font-medium text-[var(--dp-body)] text-right whitespace-nowrap">
                {t('stock')}
              </th>
              <th className="p-3" style={{ width: 64 }} />
            </tr>
          </thead>
          <tbody>
              {variants.map((variant) => (
              <tr key={variant.id} className="border-b">
                {showSize && (
                  <td className="p-2">
                    <input
                      className="w-full px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm outline-none focus:border-[var(--dp-green-500)] transition-colors"
                      value={variant.size}
                      onChange={(e) => handleChange(variant.id, 'size', e.target.value)}
                      aria-label={t('size')}
                    />
                  </td>
                )}
                {customCols.map((col) => (
                  <td key={col.id} className="p-2">
                    <input
                      className="w-full px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm outline-none focus:border-[var(--dp-green-500)] transition-colors"
                      value={variant.custom[col.id] || ''}
                      onChange={(e) => handleChange(variant.id, col.id, e.target.value)}
                      aria-label={col.name || col.id}
                    />
                  </td>
                ))}
                <td className="p-2 text-right">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    inputMode="decimal"
                    className="w-20 px-2 py-1.5 rounded-md border border-[var(--dp-line)] text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)] transition-colors"
                    value={variant.price}
                    onChange={(e) => handleChange(variant.id, 'price', e.target.value)}
                    placeholder="8"
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
                    onChange={(e) => handleChange(variant.id, 'stock', e.target.value)}
                    aria-label={t('stock')}
                  />
                </td>
                <td className="p-2 text-right">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(variant.id)}
                    aria-label={`${t('delete') || 'លុប'} ${t('variant') || 'ប្រភេទ'}`}
                    className="text-[var(--dp-muted)] hover:text-[var(--dp-danger)] transition-colors p-1"
                  >
                    <Trash2 size={15} strokeWidth={1.9} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Row Layout */}
      <div className="block lg:hidden overflow-x-auto">
        <div className="min-w-[420px] rounded-2xl border border-[var(--dp-line)] bg-[var(--dp-surface-2)] p-2">
          <div className="flex items-start gap-2 pb-2">
            {showSize && (
              <div className="min-w-[88px]">
                <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)]">
                  <span>{t('size')}</span>
                  <button
                    type="button"
                    onClick={handleDeleteSizeColumn}
                    aria-label={`${t('delete') || 'លុប'} ${t('size') || 'Size'}`}
                    className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-[var(--dp-muted)] hover:bg-white hover:text-[var(--dp-danger)] active:scale-95 touch-manipulation"
                  >
                    <X size={9} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            )}
            {customCols.map((col) => (
              <div key={col.id} className="min-w-[84px]">
                <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)]">
                  <span className="truncate">{col.name || t('colName')}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCol(col.id)}
                    aria-label={`${t('delete') || 'លុប'} ${col.name || col.id}`}
                    className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-[var(--dp-muted)] hover:bg-white hover:text-[var(--dp-danger)] active:scale-95 touch-manipulation"
                  >
                    <X size={9} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            ))}
            <div className="min-w-[68px]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)] text-center">
                {t('price')}
              </div>
            </div>
            <div className="min-w-[68px]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--dp-muted)] text-center">
                {t('stock')}
              </div>
            </div>
            <div className="min-w-[40px]" />
          </div>

          {variants.map((variant) => (
            <div key={variant.id} className="mt-2 flex items-start gap-2">
              {showSize && (
                <div className="min-w-[88px]">
                  <input
                    className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm outline-none focus:border-[var(--dp-green-500)]"
                    value={variant.size}
                    onChange={(e) => handleChange(variant.id, 'size', e.target.value)}
                    aria-label={t('size')}
                  />
                </div>
              )}
              {customCols.map((col) => (
                <div key={col.id} className="min-w-[84px]">
                  <input
                    className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm outline-none focus:border-[var(--dp-green-500)]"
                    value={variant.custom[col.id] || ''}
                    onChange={(e) => handleChange(variant.id, col.id, e.target.value)}
                    aria-label={col.name || col.id}
                  />
                </div>
              ))}
              <div className="min-w-[68px]">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  inputMode="decimal"
                  className="w-full rounded-lg border border-[var(--dp-line)] bg-white px-2 py-2 text-sm tabular-nums text-right outline-none focus:border-[var(--dp-green-500)]"
                  value={variant.price}
                  onChange={(e) => handleChange(variant.id, 'price', e.target.value)}
                  placeholder="8"
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
                  onChange={(e) => handleChange(variant.id, 'stock', e.target.value)}
                  aria-label={t('stock')}
                />
              </div>
              <div className="min-w-[40px]">
                <button
                  type="button"
                  onClick={() => handleDeleteRow(variant.id)}
                  aria-label={`${t('delete') || 'លុប'} ${t('variant') || 'ប្រភេទ'}`}
                  className="flex h-11 w-full items-center justify-center rounded-lg border border-[var(--dp-line)] bg-white p-2 text-[var(--dp-muted)] hover:bg-[var(--dp-surface-2)] hover:text-[var(--dp-danger)] active:scale-[0.98] touch-manipulation"
                >
                  <Trash2 size={15} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Column */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleAddColumn}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--dp-line)] text-sm text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)] transition-colors flex-1 sm:flex-none touch-manipulation"
        >
          <Plus size={15} strokeWidth={1.9} />
          <span>{t('addVariant') || 'បន្ថែមប្រភេទ'}</span>
        </button>
        <span className="text-xs text-[var(--dp-muted)] w-full sm:w-auto">
          {t('orStandard') || 'ឬស្តង់ដារ ៖'}
        </span>
        {!showSize && (
          <button
            type="button"
            onClick={() => {
              setShowSize(true)
              setVariants((prev) => {
                // If there are no rows yet, add one so the user can start filling in data
                const next = prev.length === 0
                  ? [...prev, { id: `row-${Date.now()}`, size: '', price: '', stock: '0', custom: {} }]
                  : prev
                emitVariants(next)
                return next
              })
            }}
            className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)] transition-colors touch-manipulation"
          >
            <Plus size={15} strokeWidth={1.9} />
            <span>{t('size') || 'Size'}</span>
          </button>
        )}
        {!customCols.find((c) => c.name === (t('color') || 'Color')) && (
          <button
            type="button"
            onClick={() => handleAddStandardColumn(t('color') || 'Color')}
            className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)] transition-colors touch-manipulation"
          >
            <Plus size={15} strokeWidth={1.9} />
            <span>{t('color') || 'Color'}</span>
          </button>
        )}
        {!customCols.find((c) => c.name === (t('power') || 'Power')) && (
          <button
            type="button"
            onClick={() => handleAddStandardColumn(t('power') || 'Power')}
            className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-[var(--dp-body)] hover:bg-[var(--dp-surface-2)] transition-colors touch-manipulation"
          >
            <Plus size={15} strokeWidth={1.9} />
            <span>{t('power') || 'Power'}</span>
          </button>
        )}
      </div>

      {/* Bottom Add Row Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleAddRow}
          className="w-full min-h-[46px] py-3 rounded-xl bg-[var(--dp-green-900)] text-white font-semibold text-sm hover:bg-[var(--dp-green-800)] transition-colors inline-flex items-center justify-center gap-2 touch-manipulation"
        >
          <Plus size={20} strokeWidth={1.9} />
          <span>{t('add')}</span>
        </button>
      </div>
    </div>
  )
}