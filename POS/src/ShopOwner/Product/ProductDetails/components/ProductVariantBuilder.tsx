import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Plus, Trash2 } from 'lucide-react'

interface VariantRow {
  id: string
  size: string
  color: string
  volume: string
  price: string
  stock: string
}

type VariantType = 'size' | 'color' | 'volume'

const sizePresets = ['S', 'M', 'L', 'XL', 'XXL']

const typeIcons: Record<VariantType, React.ReactNode> = {
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

export default function ProductVariantBuilder() {
  const { t } = useTranslation('productDetail')
  const [activeTypes, setActiveTypes] = useState<VariantType[]>([])
  const [variants, setVariants] = useState<VariantRow[]>([])
  const [sizeOptions, setSizeOptions] = useState<string[]>([])
  const [colorOptions, setColorOptions] = useState<string[]>([])
  const [volumeOptions, setVolumeOptions] = useState<string[]>([])
  const [sizeInput, setSizeInput] = useState('')
  const [colorInput, setColorInput] = useState('')
  const [volumeInput, setVolumeInput] = useState('')

  const toggleType = (type: VariantType) => {
    // Only add the type if not already active (never remove by clicking the card)
    if (!activeTypes.includes(type)) {
      setActiveTypes((prev) => [...prev, type])
    }
  }

  const handleAddOption = (type: VariantType) => {
    let value: string
    if (type === 'size') value = sizeInput.trim()
    else if (type === 'color') value = colorInput.trim()
    else value = volumeInput.trim()

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
    } else {
      if (!volumeOptions.includes(value)) {
        setVolumeOptions((prev) => [...prev, value])
        setVolumeInput('')
      }
    }
  }

  const handleAddPreset = (type: VariantType, value: string) => {
    if (type === 'size') {
      if (!sizeOptions.includes(value)) {
        setSizeOptions((prev) => [...prev, value])
      }
    } else if (type === 'color') {
      if (!colorOptions.includes(value)) {
        setColorOptions((prev) => [...prev, value])
      }
    } else {
      if (!volumeOptions.includes(value)) {
        setVolumeOptions((prev) => [...prev, value])
      }
    }
  }

  const removeOption = (type: VariantType, index: number) => {
    if (type === 'size') setSizeOptions((prev) => prev.filter((_, i) => i !== index))
    if (type === 'color') setColorOptions((prev) => prev.filter((_, i) => i !== index))
    if (type === 'volume') setVolumeOptions((prev) => prev.filter((_, i) => i !== index))
    setVariants([])
  }

  const handleRemoveType = (type: VariantType) => {
    setActiveTypes((prev) => prev.filter((t) => t !== type))
    // Clear options for the removed type
    if (type === 'size') setSizeOptions([])
    if (type === 'color') setColorOptions([])
    if (type === 'volume') setVolumeOptions([])
    setVariants([])
  }

  const handleKeyDown = (type: VariantType, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddOption(type)
    }
  }

  const handleVariantChange = (id: string, field: keyof VariantRow, value: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    )
  }

  const handleDeleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const hasVariants = variants.length > 0

  return (
    <div className="cat-grid vb-grid">
      {/* Left Column */}
      <div className="cat-col">
        {/* Card 1: Variant Type Cards */}
        <div className="dp-card">
          <h2 className="cat-cardtitle">
            {t('addVariant') || 'បន្ថែមជម្រើសដូចជា ពណ៌ និងទំហំ'}
          </h2>

          {/* Variant cards */}
          <div className="vb-cards">
            {(Object.keys(typeIcons) as VariantType[]).map((type) => {
              const isActive = activeTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`vb-card${isActive ? ' is-active' : ''}`}
                >
                  <span className="vb-card__ico">{typeIcons[type]}</span>
                  <span className="vb-card__label">{t(type)}</span>
                </button>
              )
            })}
            <button
              type="button"
              className="vb-card"
              onClick={() => {
                const newType: VariantType = 'size'
                if (!activeTypes.includes(newType)) {
                  setActiveTypes((prev) => [...prev, newType])
                }
              }}
            >
              <span className="vb-card__ico">
                <Plus size={18} strokeWidth={2} />
              </span>
              <span className="vb-card__label">{t('add') || 'បន្ថែម'}</span>
            </button>
          </div>

          {/* Editor sections for each active type */}
          {activeTypes.map((type) => {
            const options = type === 'size' ? sizeOptions : type === 'color' ? colorOptions : volumeOptions
            const inputValue = type === 'size' ? sizeInput : type === 'color' ? colorInput : volumeInput
            const setInput = (v: string) => {
              if (type === 'size') setSizeInput(v)
              else if (type === 'color') setColorInput(v)
              else setVolumeInput(v)
            }
            const isSize = type === 'size'

            return (
              <div key={type} className="vb-editor">
                <div className="vb-editor__head">
                  <span className="vb-editor__title">{t(type)}</span>
                  <button
                    type="button"
                    className="vb-editor__x"
                    onClick={() => handleRemoveType(type)}
                    aria-label={`${t('delete') || 'លុប'} ${t(type) || type}`}
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
                      placeholder={t('enterColName') || `បញ្ចូល${t(type)}ដែលអ្នកចង់បាន...`}
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

                  {/* Presets for size */}
                  {isSize && (
                    <>
                      <div className="vb-preset-hint">
                        {t('orStandard') || 'ជ្រើសរើសយកទំហំដែលមានស្រាប់'}
                      </div>
                      <div className="vb-presets">
                        {sizePresets.map((p) => (
                          <button
                            key={p}
                            type="button"
                            className={`vb-preset${sizeOptions.includes(p) ? ' is-selected' : ''}`}
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
                    {activeTypes.includes('size') && <th>{t('size')}</th>}
                    {activeTypes.includes('color') && <th>{t('color')}</th>}
                    {activeTypes.includes('volume') && <th>{t('power')}</th>}
                    <th style={{ textAlign: 'right' }}>{t('price')}</th>
                    <th style={{ textAlign: 'right' }}>{t('stock')}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant.id}>
                      {activeTypes.includes('size') && <td>{variant.size}</td>}
                      {activeTypes.includes('color') && <td>{variant.color}</td>}
                      {activeTypes.includes('volume') && <td>{variant.volume}</td>}
                      <td>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          inputMode="decimal"
                          className="vb-price-input"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
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
                          onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                          aria-label={t('stock')}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="vb-del-btn"
                          onClick={() => handleDeleteVariant(variant.id)}
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

      {/* Right Column: Review */}
      <div className="cat-col">
        <div className="dp-card">
          <h2 className="cat-cardtitle">
            {t('aboutProduct') || 'ពិនិត្យមើលឡើងវិញ'}
          </h2>

          <div className="vb-preview">
            <div className="vb-preview__head">
              <div className="vb-preview__img">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
                  <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                  <circle cx="8.5" cy="9.5" r="1.6" />
                  <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20.5 16" />
                </svg>
              </div>
              <div className="vb-preview__meta">
                <span className="vb-preview__name">{t('enterProductName') || 'បញ្ចូលឈ្មោះផលិតផល'}</span>
                <div className="vb-preview__cat">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
                    <path d="M4 4h7l9 9-7 7-9-9V4Z" />
                    <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
                  </svg>
                  {t('other') || 'ផ្សេងៗ'}
                </div>
                <div className="vb-preview__price dp-tnum">—</div>
                <div className="vb-preview__stock">
                  {t('inStock') || 'ក្នុងស្តុក'} : <span className="dp-tnum">0</span>
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
                {variants.map((v) => (
                  <span key={v.id} className="vb-tag">
                    {[
                      v.size && activeTypes.includes('size') ? v.size : '',
                      v.color && activeTypes.includes('color') ? v.color : '',
                      v.volume && activeTypes.includes('volume') ? v.volume : '',
                    ]
                      .filter(Boolean)
                      .join(' / ')}
                    <span className="text-[var(--dp-muted)] ml-1">
                      ${v.price || '0.00'}
                    </span>
                    <button
                      type="button"
                      className="vb-tag__x"
                      onClick={() => handleDeleteVariant(v.id)}
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