import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Plus, Trash2 } from 'lucide-react'
import type { ProductDraft, ProductVariant } from '../../Productlist/components/ProductTypes'

export interface ProductVariantBuilderHandle {
  getVariants: () => ProductVariant[]
}

interface ProductVariantBuilderProps {
  onVariantsChange?: (variants: ProductVariant[]) => void
}

interface CustomVariantType {
  key: string
  name: string
}

const sizePresets = ['S', 'M', 'L', 'XL', 'XXL']
const colorPresetKeys = ['white', 'black', 'red', 'orange', 'pink', 'yellow']
const volumePresets = ['500ml', '700ml', '1000ml']

const typeIcons: Record<string, React.ReactNode> = {
  size: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M12 3.5l1.7 4.6L18.3 9.8 13.7 11.5 12 16.1 10.3 11.5 5.7 9.8 10.3 8.1 12 3.5Z" />
      <path d="M18 14l.7 1.9 1.9.7-1.9.7L18 19.2l-.7-1.9-1.9-.7 1.9-.7L18 14Z" />
    </svg>
  ),
  color: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M14.5 5.5l4 4M4 20l1-4L16 5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z" />
    </svg>
  ),
  volume: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5v-7Z" />
      <path d="M3 8.5 12 13.5l9-5" />
      <path d="M12 13.5V20.5" />
    </svg>
  ),
}

// Read draft data from sessionStorage (set by CreateVariantSection)
const DEFAULT_DRAFT: ProductDraft = {
  name: '',
  category: 'clothes',
  price: '',
  stock: '',
  description: '',
  images: [],
}

const loadDraft = (): ProductDraft => {
  if (typeof window === 'undefined') return DEFAULT_DRAFT
  try {
    const raw = sessionStorage.getItem('posProductDraft')
    if (!raw) return DEFAULT_DRAFT
    return { ...DEFAULT_DRAFT, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_DRAFT
  }
}

const ProductVariantBuilder = forwardRef<ProductVariantBuilderHandle, ProductVariantBuilderProps>(
  function ProductVariantBuilder({ onVariantsChange }, ref) {
    const { t } = useTranslation('productDetail')
    const [draft] = useState<ProductDraft>(loadDraft)

    // Load persisted variant builder state from sessionStorage
    const loadVariantState = () => {
      if (typeof window === 'undefined') return null
      try {
        const raw = sessionStorage.getItem('posVariantState')
        if (!raw) return null
        return JSON.parse(raw)
      } catch {
        return null
      }
    }

    const savedVariantState = loadVariantState()

    const [activeTypes, setActiveTypes] = useState<string[]>(savedVariantState?.activeTypes ?? [])
    const [sizeOptions, setSizeOptions] = useState<string[]>(savedVariantState?.sizeOptions ?? [])
    const [colorOptions, setColorOptions] = useState<string[]>(savedVariantState?.colorOptions ?? [])
    const [volumeOptions, setVolumeOptions] = useState<string[]>(savedVariantState?.volumeOptions ?? [])
    const [customTypes, setCustomTypes] = useState<CustomVariantType[]>(savedVariantState?.customTypes ?? [])
    const [customValues, setCustomValues] = useState<Record<string, string[]>>(savedVariantState?.customValues ?? {})
    const [sizeInput, setSizeInput] = useState('')
    const [colorInput, setColorInput] = useState('')
    const [volumeInput, setVolumeInput] = useState('')

    // Price & stock stored per combination label so values persist when combinations change
    const [priceStockMap, setPriceStockMap] = useState<Record<string, { price: string; stock: string }>>(savedVariantState?.priceStockMap ?? {})

    // Default price/stock applied to all current AND future variants
    const [defaultPrice, setDefaultPrice] = useState(savedVariantState?.defaultPrice ?? '')
    const [defaultStock, setDefaultStock] = useState(savedVariantState?.defaultStock ?? '')

    // Track which variant rows the user has explicitly deleted
    const [deletedVariants, setDeletedVariants] = useState<string[]>(savedVariantState?.deletedVariants ?? [])

    // Custom variant form state
    const [showCustomForm, setShowCustomForm] = useState(false)
    const [customNameInput, setCustomNameInput] = useState('')
    const [customValueInput, setCustomValueInput] = useState('')
    const [customValuesTemp, setCustomValuesTemp] = useState<string[]>([])

    const toggleType = (type: string) => {
      if (activeTypes.includes(type)) {
        // Close the card — the category button appears back
        setActiveTypes((prev) => prev.filter((t) => t !== type))
      } else {
        // Newly added type cards appear on top (first added is at the bottom)
        setActiveTypes((prev) => [type, ...prev])
      }
    }

    // ── Helpers for display ──
    const getTypeLabel = (type: string) => {
      if (type === 'size') return t('size') || 'Size'
      if (type === 'color') return t('color') || 'Color'
      if (type === 'volume') return t('volume') || 'Volume'
      const custom = customTypes.find((c) => c.key === type)
      return custom ? custom.name : type
    }

    const getTypeOptions = (type: string): string[] => {
      if (type === 'size') return sizeOptions
      if (type === 'color') return colorOptions
      if (type === 'volume') return volumeOptions
      return customValues[type] || []
    }

    const getTypeInput = (type: string): string => {
      if (type === 'size') return sizeInput
      if (type === 'color') return colorInput
      if (type === 'volume') return volumeInput
      return ''
    }

    const setTypeInput = (type: string, v: string) => {
      if (type === 'size') setSizeInput(v)
      else if (type === 'color') setColorInput(v)
      else if (type === 'volume') setVolumeInput(v)
    }

    const getTypePresets = (type: string): string[] => {
      if (type === 'size') return sizePresets
      if (type === 'color') return colorPresetKeys.map((key) => t(key))
      if (type === 'volume') return volumePresets
      return []
    }

    const handleAddOption = (type: string) => {
      let value: string
      if (type === 'size') value = sizeInput.trim()
      else if (type === 'color') value = colorInput.trim()
      else if (type === 'volume') value = volumeInput.trim()
      else value = ''

      if (!value) return

      if (type === 'size') {
        if (!sizeOptions.includes(value)) {
          setSizeOptions((prev) => [...prev, value])
          setSizeInput('')
        }
      } else if (type === 'color') {
        if (!colorOptions.includes(value)) {
          setColorOptions((prev) => [...prev, value])
          setColorInput('')
        }
      } else if (type === 'volume') {
        if (!volumeOptions.includes(value)) {
          setVolumeOptions((prev) => [...prev, value])
          setVolumeInput('')
        }
      }
    }

    const handleAddPreset = (type: string, value: string) => {
      if (type === 'size') {
        if (!sizeOptions.includes(value)) {
          setSizeOptions((prev) => [...prev, value])
        }
      } else if (type === 'color') {
        if (!colorOptions.includes(value)) {
          setColorOptions((prev) => [...prev, value])
        }
      } else if (type === 'volume') {
        if (!volumeOptions.includes(value)) {
          setVolumeOptions((prev) => [...prev, value])
        }
      }
    }

    const removeOption = (type: string, index: number) => {
      if (type === 'size') setSizeOptions((prev) => prev.filter((_, i) => i !== index))
      if (type === 'color') setColorOptions((prev) => prev.filter((_, i) => i !== index))
      if (type === 'volume') setVolumeOptions((prev) => prev.filter((_, i) => i !== index))
    }

    const handleRemoveType = (type: string) => {
      setActiveTypes((prev) => prev.filter((t) => t !== type))
      if (type === 'size') setSizeOptions([])
      if (type === 'color') setColorOptions([])
      if (type === 'volume') setVolumeOptions([])
    }

    const handleKeyDown = (type: string, e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAddOption(type)
      }
    }

    // ── Custom variant type form handlers ──
    const openCustomForm = () => {
      setShowCustomForm(true)
      setCustomNameInput('')
      setCustomValueInput('')
      setCustomValuesTemp([])
    }

    const closeCustomForm = () => {
      setShowCustomForm(false)
      setCustomNameInput('')
      setCustomValueInput('')
      setCustomValuesTemp([])
    }

    const addCustomValue = () => {
      const value = customValueInput.trim()
      if (!value) return
      if (!customValuesTemp.includes(value)) {
        setCustomValuesTemp((prev) => [...prev, value])
        setCustomValueInput('')
      }
    }

    const removeCustomValue = (index: number) => {
      setCustomValuesTemp((prev) => prev.filter((_, i) => i !== index))
    }

    const saveCustomType = () => {
      const name = customNameInput.trim()
      if (!name) return

      const key = `custom-${Date.now()}`

      setCustomTypes((prev) => [...prev, { key, name }])
      setCustomValues((prev) => ({ ...prev, [key]: [...customValuesTemp] }))
      setActiveTypes((prev) => [key, ...prev])

      closeCustomForm()
    }

    const handleRemoveCustomType = (key: string) => {
      setCustomTypes((prev) => prev.filter((c) => c.key !== key))
      setCustomValues((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      setActiveTypes((prev) => prev.filter((t) => t !== key))
    }

    // ── Derived: build the real-time variant combinations from selected options ──
    const derivedVariants = useMemo(() => {
      const dimensions: Record<string, string[]> = {}

      activeTypes.forEach((type) => {
        const options = getTypeOptions(type)
        if (options.length > 0) {
          dimensions[type] = options
        }
      })

      const dimKeys = Object.keys(dimensions)
      if (dimKeys.length === 0) return []

      // Build all combinations
      const combos: Record<string, string>[] = [{}]
      dimKeys.forEach((key) => {
        const options = dimensions[key]
        const next: Record<string, string>[] = []
        combos.forEach((combo) => {
          options.forEach((opt) => {
            next.push({ ...combo, [key]: opt })
          })
        })
        combos.splice(0, combos.length, ...next)
      })

      return combos
        .map((combo, index) => {
          const key = activeTypes.map((type) => combo[type] || '').filter(Boolean).join(' / ')
          const saved = priceStockMap[key] || { price: defaultPrice, stock: defaultStock }
          return {
            key,
            id: `v-${key}-${index}`,
            values: combo,
            price: saved.price,
            stock: saved.stock,
          }
        })
        .filter((variant) => !deletedVariants.includes(variant.key))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTypes, sizeOptions, colorOptions, volumeOptions, customValues, customTypes, priceStockMap, defaultPrice, defaultStock, deletedVariants])

    const hasVariants = derivedVariants.length > 0

    // ── Price & stock update stored per combination key ──
    const handlePriceStockChange = (variantKey: string, field: 'price' | 'stock', value: string) => {
      setPriceStockMap((prev) => ({
        ...prev,
        [variantKey]: {
          ...(prev[variantKey] || { price: defaultPrice, stock: defaultStock }),
          [field]: value,
        },
      }))
    }

    const handleDeleteVariant = (variantKey: string) => {
      // Remove the variant row entirely
      setDeletedVariants((prev) => (prev.includes(variantKey) ? prev : [...prev, variantKey]))
      setPriceStockMap((prev) => {
        const next = { ...prev }
        delete next[variantKey]
        return next
      })
    }

    // Apply a single price / stock value to every variant row (current + future)
    const applyToAll = (field: 'price' | 'stock', value: string) => {
      if (!value) return
      if (field === 'price') setDefaultPrice(value)
      if (field === 'stock') setDefaultStock(value)
      setPriceStockMap((prev) => {
        const next = { ...prev }
        derivedVariants.forEach((variant) => {
          next[variant.key] = {
            price: field === 'price' ? value : prev[variant.key]?.price || defaultPrice,
            stock: field === 'stock' ? value : prev[variant.key]?.stock || defaultStock,
          }
        })
        return next
      })
    }

    // Expose a synchronous getVariants() so the parent can read variants at save time
    useImperativeHandle(ref, () => ({
      getVariants: () =>
        derivedVariants.map((row) => ({
          label: row.key || row.id,
          stock: Number(row.stock) || 0,
          lowStock: Number(row.stock) > 0 && Number(row.stock) <= 5,
          price: row.price,
          attributes: row.values,
        })),
    }), [derivedVariants])

    // Notify parent of variant data changes (real-time, for preview/other uses)
    useEffect(() => {
      if (!onVariantsChange) return
      onVariantsChange(
        derivedVariants.map((row) => ({
          label: row.key || row.id,
          stock: Number(row.stock) || 0,
          lowStock: Number(row.stock) > 0 && Number(row.stock) <= 5,
          price: row.price,
          attributes: row.values,
        }))
      )
    }, [derivedVariants, onVariantsChange])

    // Persist variant builder state to sessionStorage whenever it changes
    useEffect(() => {
      if (typeof window === 'undefined') return
      sessionStorage.setItem('posVariantState', JSON.stringify({
        activeTypes,
        sizeOptions,
        colorOptions,
        volumeOptions,
        customTypes,
        customValues,
        priceStockMap,
        defaultPrice,
        defaultStock,
        deletedVariants,
      }))
    }, [activeTypes, sizeOptions, colorOptions, volumeOptions, customTypes, customValues, priceStockMap, defaultPrice, defaultStock, deletedVariants])

    return (
      <div className="cat-grid vb-grid">
        {/* Left Column */}
        <div className="cat-col">
          {/* Card 1: Variant Type Cards */}
          <div className="dp-card">
            <h2 className="cat-cardtitle">
              {t('addVariant') || 'បន្ថែមជម្រើសដូចជា ពណ៌ និងទំហំ'}
            </h2>

            {/* Variant cards — active cards disappear, appear back when closed */}
            <div className="vb-cards">
              {(Object.keys(typeIcons) as string[]).map((type) => {
                const isActive = activeTypes.includes(type)
                if (isActive) return null // hide the button when active
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className="vb-card"
                  >
                    <span className="vb-card__ico">{typeIcons[type]}</span>
                    <span className="vb-card__label">{t(type)}</span>
                  </button>
                )
              })}

              {/* Custom active types */}
              {customTypes.map((custom) => {
                const isActive = activeTypes.includes(custom.key)
                if (isActive) return null // hide the button when active
                return (
                  <button
                    key={custom.key}
                    type="button"
                    onClick={() => toggleType(custom.key)}
                    className="vb-card"
                  >
                    <span className="vb-card__ico"><Plus size={18} strokeWidth={2} /></span>
                    <span className="vb-card__label">{custom.name}</span>
                  </button>
                )
              })}

              <button
                type="button"
                className="vb-card"
                onClick={openCustomForm}
              >
                <span className="vb-card__ico">
                  <Plus size={18} strokeWidth={2} />
                </span>
                <span className="vb-card__label">{t('add') || 'បន្ថែម'}</span>
              </button>
            </div>

            {/* ── Custom variant type form ── */}
            {showCustomForm && (
              <div className="vb-editor">
                <div className="vb-editor__head">
                  <span className="vb-editor__title">
                    {t('customVariantType') || 'ប្រភេទបំរែបំរួលថ្មី'}
                  </span>
                  <button
                    type="button"
                    className="vb-editor__x"
                    onClick={closeCustomForm}
                    aria-label={t('cancel') || 'បោះបង់'}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
                    </svg>
                  </button>
                </div>

                <div className="vb-editor__box">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[var(--dp-body)]">
                      {t('customVariantName') || 'ឈ្មោះប្រភេទ'}
                    </label>
                    <input
                      className="vb-input"
                      placeholder={t('customVariantNamePlaceholder') || 'ឧ. រសជាតិ, សម្ភារៈ...'}
                      value={customNameInput}
                      onChange={(e) => setCustomNameInput(e.target.value)}
                      aria-label={t('customVariantName') || 'ឈ្មោះប្រភេទ'}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[var(--dp-body)]">
                      {t('customVariantValue') || 'តម្លៃប្រភេទ'}
                    </label>
                    <div className="vb-addrow">
                      <input
                        className="vb-input"
                        placeholder={t('customVariantValuePlaceholder') || 'បញ្ចូលតម្លៃ...'}
                        value={customValueInput}
                        onChange={(e) => setCustomValueInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addCustomValue()
                          }
                        }}
                        aria-label={t('customVariantValue') || 'តម្លៃប្រភេទ'}
                      />
                      <button
                        type="button"
                        className="vb-addbtn"
                        onClick={addCustomValue}
                        aria-label={t('add') || 'បន្ថែម'}
                      >
                        <Plus size={18} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>

                  {/* Temp selected values */}
                  {customValuesTemp.length > 0 && (
                    <div className="vb-tags">
                      {customValuesTemp.map((opt, idx) => (
                        <span key={idx} className="vb-tag">
                          <span>{opt}</span>
                          <button
                            type="button"
                            className="vb-tag__x"
                            onClick={() => removeCustomValue(idx)}
                          >
                            <X size={11} strokeWidth={2.6} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-full min-h-[40px] rounded-xl bg-[var(--dp-green-900)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--dp-green-800)] transition-colors"
                    onClick={saveCustomType}
                    disabled={!customNameInput.trim()}
                  >
                    {t('save') || 'រក្សាទុក'}
                  </button>
                </div>
              </div>
            )}

            {/* Editor sections for each active type */}
            {activeTypes.map((type) => {
              const options = getTypeOptions(type)
              const inputValue = getTypeInput(type)
              const setInput = (v: string) => setTypeInput(type, v)
              const isSize = type === 'size'
              const isColor = type === 'color'
              const isVolume = type === 'volume'
              const isCustom = customTypes.some((c) => c.key === type)
              const presets = getTypePresets(type)

              return (
                <div key={type} className="vb-editor">
                  <div className="vb-editor__head">
                    <span className="vb-editor__title">{getTypeLabel(type)}</span>
                    <button
                      type="button"
                      className="vb-editor__x"
                      onClick={() => (isCustom ? handleRemoveCustomType(type) : handleRemoveType(type))}
                      aria-label={`${t('delete') || 'លុប'} ${getTypeLabel(type)}`}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
                      </svg>
                    </button>
                  </div>

                  <div className="vb-editor__box">
                    <div className="vb-addrow">
                      <input
                        className="vb-input"
                        placeholder={t('enterColName') || `បញ្ចូល${getTypeLabel(type)}ដែលអ្នកចង់បាន...`}
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(type, e)}
                      />
                      <button
                        type="button"
                        className="vb-addbtn"
                        onClick={() => handleAddOption(type)}
                        aria-label={t('add') || 'បន្ថែម'}
                      >
                        <Plus size={18} strokeWidth={2.2} />
                      </button>
                    </div>

                    {/* Presets */}
                    {(isSize || isColor || isVolume) && presets.length > 0 && (
                      <>
                        <div className="vb-preset-hint">
                          {t('orStandard') || 'ជ្រើសរើសយកប្រភេទដែលមានស្រាប់'}
                        </div>
                        <div className="vb-presets">
                          {presets.map((p) => (
                            <button
                              key={p}
                              type="button"
                              className={`vb-preset${options.includes(p) ? ' is-selected' : ''}`}
                              onClick={() => handleAddPreset(type, p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Selected option tags */}
                    {options.length > 0 && (
                      <div className="vb-tags">
                        {options.map((opt, idx) => (
                          <span key={idx} className="vb-tag">
                            <span>{opt}</span>
                            <button
                              type="button"
                              className="vb-tag__x"
                              onClick={() => removeOption(type, idx)}
                            >
                              <X size={11} strokeWidth={2.6} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card 2: Price and Stock */}
          <div className="dp-card">
            <h2 className="cat-cardtitle">
              {t('typesAndStock') || 'កំណត់តម្លៃ និងចំនួនស្តុកសម្រាប់រាល់បំរែបំរួលនិមួយៗ'}
            </h2>

            {/* Apply-to-all helpers — under the label title */}
            <div className="vb-apply-all">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--dp-body)]">
                  {t('applyPriceToAll') || 'Apply price to all'}:
                </span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  inputMode="decimal"
                  className="vb-apply-input"
                  placeholder="0.00"
                  aria-label={t('applyPriceToAll') || 'Apply price to all'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      applyToAll('price', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      applyToAll('price', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  className="vb-apply-btn"
                  onClick={() => {
                    // no-op; blur handler performs the apply
                  }}
                >
                  {t('apply') || 'Apply'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--dp-body)]">
                  {t('applyStockToAll') || 'Apply stock to all'}:
                </span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  className="vb-apply-input"
                  placeholder="0"
                  aria-label={t('applyStockToAll') || 'Apply stock to all'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      applyToAll('stock', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      applyToAll('stock', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  className="vb-apply-btn"
                  onClick={() => {
                    // no-op; blur handler performs the apply
                  }}
                >
                  {t('apply') || 'Apply'}
                </button>
              </div>
            </div>

            {!hasVariants && (
              <p className="vb-empty">
                {t('variantHintMessage') || 'បន្ថែមជម្រើសខាងលើ ដើម្បីបង្កើតបំរែបំរួល។'}
              </p>
            )}

            {hasVariants && (
              <div className="vb-table-wrap">
                <table className="vb-table">
                  <thead>
                    <tr>
                      {activeTypes.map((type) => (
                        <th key={type}>{getTypeLabel(type)}</th>
                      ))}
                      <th style={{ textAlign: 'right' }}>{t('price')}</th>
                      <th style={{ textAlign: 'right' }}>{t('stock')}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {derivedVariants.map((variant) => (
                      <tr key={variant.id}>
                        {activeTypes.map((type) => (
                          <td key={type}>{variant.values[type] || ''}</td>
                        ))}
                        <td>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            inputMode="decimal"
                            className="vb-price-input"
                            value={variant.price}
                            onChange={(e) => handlePriceStockChange(variant.key, 'price', e.target.value)}
                            placeholder="0.00"
                            aria-label={t('price')}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min={0}
                            step={1}
                            inputMode="numeric"
                            className="vb-stock-input"
                            value={variant.stock}
                            onChange={(e) => handlePriceStockChange(variant.key, 'stock', e.target.value)}
                            aria-label={t('stock')}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="vb-del-btn"
                            onClick={() => handleDeleteVariant(variant.key)}
                            aria-label={`${t('delete') || 'លុប'} ${t('variant') || 'ប្រភេទ'}`}
                          >
                            <Trash2 size={14} strokeWidth={1.9} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="cat-col">
          <div className="dp-card">
            <h2 className="cat-cardtitle">
              {t('aboutProduct') || 'ពិនិត្យមើលឡើងវិញ'}
            </h2>

            <div className="vb-preview">
              <div className="vb-preview__head">
                <div className="vb-preview__img">
                  {draft.images && draft.images.length > 0 ? (
                    <img
                      src={draft.images[0]}
                      alt={draft.name || 'Product'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
                    />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
                      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                      <circle cx="8.5" cy="9.5" r="1.6" />
                      <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20.5 16" />
                    </svg>
                  )}
                </div>
                <div className="vb-preview__meta">
                  <span className="vb-preview__name">{draft.name || t('enterProductName') || 'បញ្ចូលឈ្មោះផលិតផល'}</span>
                  <div className="vb-preview__cat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
                      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
                      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
                    </svg>
                    {draft.category || t('other') || 'ផ្សេងៗ'}
                  </div>
                  <div className="vb-preview__price dp-tnum">
                    {draft.price ? `$${draft.price}` : '—'}
                  </div>
                  <div className="vb-preview__stock">
                    {t('inStock') || 'ក្នុងស្តុក'} : <span className="dp-tnum">{draft.stock || 0}</span>
                  </div>
                </div>
              </div>

              <div className="vb-preview__label">{t('typesAndStock') || 'ប្រភេទ និង ស្តុក'}</div>

              {!hasVariants && (
                <p className="vb-empty">
                  {t('variantHintMessage') || 'បន្ថែមជម្រើសខាងលើ ដើម្បីបង្កើតបំរែបំរួល។'}
                </p>
              )}

              {hasVariants && (
                <div className="vb-tags">
                  {derivedVariants.map((v) => (
                    <span key={v.id} className="vb-tag">
                      {v.key}
                      <span className="text-[var(--dp-muted)] ml-1">
                        ${v.price || '0.00'}
                      </span>
                      <button
                        type="button"
                        className="vb-tag__x"
                        onClick={() => handleDeleteVariant(v.key)}
                      >
                        <X size={10} strokeWidth={2.6} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default ProductVariantBuilder