import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import CreateVariantSection from './CreateVariantSection'

interface CreateGeneralInfoProps {
  name: string
  category: string
  price: string
  stock: string
  description: string
  images?: string[]
  onNameChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceChange: (value: string) => void
  onStockChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export default function CreateGeneralInfo({
  name,
  category,
  price,
  stock,
  description,
  images,
  onNameChange,
  onCategoryChange,
  onPriceChange,
  onStockChange,
  onDescriptionChange,
}: CreateGeneralInfoProps) {
  const { t } = useTranslation('productDetail')

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
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-5">
      <h2 className="mb-5 text-sm font-semibold text-[var(--dp-ink)]">{t('generalInfo') || 'ពត៌មានទូទៅ'}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-name" className="text-xs font-medium text-[var(--dp-body)]">
            {t('productName') || 'ឈ្មោះផលិតផល'}
            <span className="ml-0.5 text-[var(--dp-danger)]">*</span>
          </label>
          <input
            id="cat-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={t('enterProductName') || 'បញ្ចូលឈ្មោះផលិតផល'}
            className="w-full rounded-[var(--dp-r-field)] border border-[var(--dp-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--dp-ink)] outline-none placeholder:text-[var(--dp-muted)] focus:border-[var(--dp-green-500)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-cat" className="text-xs font-medium text-[var(--dp-body)]">{t('category') || 'ប្រភេទ'}</label>
          <span className="relative">
            <select
              id="cat-cat"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-[var(--dp-r-field)] border border-[var(--dp-line)] bg-white px-3.5 py-2.5 pr-9 text-sm text-[var(--dp-ink)] outline-none focus:border-[var(--dp-green-500)]"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} strokeWidth={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dp-muted)]" />
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="cat-price" className="text-xs font-medium text-[var(--dp-body)]">
          {t('enterPrice') || 'បញ្ចូលតម្លៃ'}
          <span className="ml-0.5 text-[var(--dp-danger)]">*</span>
        </label>
        <input
          id="cat-price"
          type="number"
          min={0}
          step={0.01}
          inputMode="decimal"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="$0.00"
          className="w-full rounded-[var(--dp-r-field)] border border-[var(--dp-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--dp-ink)] tabular-nums outline-none placeholder:text-[var(--dp-muted)] focus:border-[var(--dp-green-500)]"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="cat-stock" className="text-xs font-medium text-[var(--dp-body)]">
          {t('stock') || 'ស្តុក'}
          <span className="ml-0.5 text-[var(--dp-danger)]">*</span>
        </label>
        <input
          id="cat-stock"
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          value={stock}
          onChange={(e) => onStockChange(e.target.value)}
          placeholder="0"
          className="w-full rounded-[var(--dp-r-field)] border border-[var(--dp-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--dp-ink)] tabular-nums outline-none placeholder:text-[var(--dp-muted)] focus:border-[var(--dp-green-500)]"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="cat-desc" className="text-xs font-medium text-[var(--dp-body)]">{t('details') || 'ពត៌មានលម្អិត'}</label>
        <textarea
          id="cat-desc"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          maxLength={maxChars}
          placeholder={t('enterDetails') || 'បញ្ចូលពត៌មានលម្អិតផលិតផល'}
          rows={3}
          className="w-full resize-none rounded-[var(--dp-r-field)] border border-[var(--dp-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--dp-ink)] outline-none placeholder:text-[var(--dp-muted)] focus:border-[var(--dp-green-500)]"
        />
        <span className="self-end text-xs text-[var(--dp-muted)] tabular-nums">
          {charCount} / {maxChars} {t('characters') || 'តួអក្សរ'}
        </span>
      </div>

      <CreateVariantSection
        draft={{
          name,
          category,
          price,
          stock,
          description,
          images,
        }}
      />
    </div>
  )
}
