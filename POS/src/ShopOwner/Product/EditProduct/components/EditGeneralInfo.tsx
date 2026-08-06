import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

interface EditGeneralInfoProps {
  initialName?: string
  initialCategory?: string
  initialPrice?: string
  initialDescription?: string
  onNameChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  onPriceChange?: (value: string) => void
  onDescriptionChange?: (value: string) => void
}

export default function EditGeneralInfo({
  initialName = 'Cap',
  initialCategory = 'accessories',
  initialPrice = '8',
  initialDescription = 'Good Qaunlity',
  onNameChange,
  onCategoryChange,
  onPriceChange,
  onDescriptionChange,
}: EditGeneralInfoProps) {
  const { t } = useTranslation('productDetail')
  const [name, setName] = useState(initialName)
  const [category, setCategory] = useState(initialCategory)
  const [price, setPrice] = useState(initialPrice)
  const [description, setDescription] = useState(initialDescription)

  const categories = [
    { value: 'clothes', label: t('clothing') || 'សម្លៀកបំពាក់' },
    { value: 'cosmetics', label: t('cosmetics') || 'គ្រឿងសម្អាង' },
    { value: 'shoes', label: t('shoes') || 'ស្បែកជើង' },
    { value: 'accessories', label: t('accessories') || 'គ្រឿងតុបតែង' },
    { value: 'other', label: t('other') || 'ផ្សេងៗ' },
  ]

  const charCount = description.length
  const maxChars = 500

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-[var(--dp-ink)] mb-4 sm:mb-5">
        {t('generalInfo') || 'ពត៌មានទូទៅ'}
      </h2>

      {/* Name + Category row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-name" className="text-xs font-medium text-[var(--dp-body)]">
            {t('productName') || 'ឈ្មោះផលិតផល'}
            <span className="text-[var(--dp-danger)] ml-0.5">*</span>
          </label>
          <input
            id="cat-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              onNameChange?.(e.target.value)
            }}
            placeholder={t('enterProductName') || 'បញ្ចូលឈ្មោះផលិតផល'}
            className="
              w-full px-3.5 py-2.5 rounded-[var(--dp-r-field)]
              border border-[var(--dp-line)]
              text-sm text-[var(--dp-ink)]
              bg-white outline-none
              placeholder:text-[var(--dp-muted)]
              focus:border-[var(--dp-green-500)]
              transition-colors
            "
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-cat" className="text-xs font-medium text-[var(--dp-body)]">
            {t('category') || 'ប្រភេទ'}
          </label>
          <span className="relative">
            <select
              id="cat-cat"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                onCategoryChange?.(e.target.value)
              }}
              className="
                w-full appearance-none px-3.5 py-2.5 pr-9
                rounded-[var(--dp-r-field)]
                border border-[var(--dp-line)]
                text-sm text-[var(--dp-ink)]
                bg-white outline-none
                focus:border-[var(--dp-green-500)]
                transition-colors cursor-pointer
              "
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--dp-muted)]" />
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5 mt-3 sm:mt-4">
        <label htmlFor="cat-price" className="text-xs font-medium text-[var(--dp-body)]">
          {t('enterPrice') || 'បញ្ចូលតម្លៃ'}
          <span className="text-[var(--dp-danger)] ml-0.5">*</span>
        </label>
        <input
          id="cat-price"
          type="number"
          min={0}
          step={0.01}
          inputMode="decimal"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
            onPriceChange?.(e.target.value)
          }}
          placeholder="$0.00"
          className="
            w-full px-3.5 py-2.5 rounded-[var(--dp-r-field)]
            border border-[var(--dp-line)]
            text-sm text-[var(--dp-ink)] tabular-nums
            bg-white outline-none
            placeholder:text-[var(--dp-muted)]
            focus:border-[var(--dp-green-500)]
            transition-colors
          "
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5 mt-3 sm:mt-4">
        <label htmlFor="cat-desc" className="text-xs font-medium text-[var(--dp-body)]">
          {t('details') || 'ពត៌មានលម្អិត'}
        </label>
        <textarea
          id="cat-desc"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            onDescriptionChange?.(e.target.value)
          }}
          maxLength={maxChars}
          placeholder={t('enterDetails') || 'បញ្ចូលពត៌មានលម្អិតផលិតផល'}
          rows={3}
          className="
            w-full px-3.5 py-2.5 rounded-[var(--dp-r-field)]
            border border-[var(--dp-line)]
            text-sm text-[var(--dp-ink)]
            bg-white outline-none resize-none
            placeholder:text-[var(--dp-muted)]
            focus:border-[var(--dp-green-500)]
            transition-colors
          "
        />
        <span className="text-xs text-[var(--dp-muted)] tabular-nums self-end">
          {charCount} / {maxChars} {t('characters') || 'តួអក្សរ'}
        </span>
      </div>
    </div>
  )
}