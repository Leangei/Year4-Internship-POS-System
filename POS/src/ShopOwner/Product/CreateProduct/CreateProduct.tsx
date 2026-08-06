import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CreateProductHeader from './components/CreateProductHeader'
import CreateImageSection from './components/CreateImageSection'
import CreateGeneralInfo from './components/CreateGeneralInfo'
import CreateFacebookCaption from './components/CreateFacebookCaption'
import { createAndSaveProduct } from '../ProductData'

const loadDraft = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem('posProductDraft')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default function CreateProduct() {
  const navigate = useNavigate()
  const { t } = useTranslation(['product', 'productDetail'])

  const savedDraft = loadDraft()

  const [name, setName] = useState(savedDraft?.name ?? '')
  const [category, setCategory] = useState(savedDraft?.category ?? 'clothes')
  const [price, setPrice] = useState(savedDraft?.price ?? '')
  const [stock, setStock] = useState(savedDraft?.stock ?? '')
  const [description, setDescription] = useState(savedDraft?.description ?? '')
  const [images, setImages] = useState<string[]>(savedDraft?.images ?? [])
  const [saveError, setSaveError] = useState('')

  const categoryLabel = useMemo(() => {
    switch (category) {
      case 'cosmetics':
        return t('cosmetics', { ns: 'productDetail' }) || 'Cosmetics'
      case 'shoes':
        return t('shoes', { ns: 'productDetail' }) || 'Shoes'
      case 'accessories':
        return t('accessories', { ns: 'productDetail' }) || 'Accessories'
      case 'other':
        return t('other', { ns: 'productDetail' }) || 'Other'
      case 'clothes':
      default:
        return t('clothing', { ns: 'productDetail' }) || 'Clothing'
    }
  }, [category, t])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    setSaveError('')

    try {
      const newProduct = await createAndSaveProduct({
        name: name || 'Unnamed product',
        category,
        price: price || '0',
        stock: Number(stock) || 0,
        description,
        images,
        variants: [],
      })

      console.log('Product saved:', newProduct)
      navigate('/shopOwner/products')
    } catch (error) {
      console.error('Failed to save product:', error)
      setSaveError(
        'Failed to save product. The images may be too large — try removing some images or using smaller photos.',
      )
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-3 sm:p-4 lg:p-8">
      <CreateProductHeader
        productName={name || t('create.createProduct', { ns: 'product' }) || 'Create Product'}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {saveError && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-[var(--dp-danger)] bg-[var(--dp-danger-tint)] px-4 py-3 text-sm font-medium text-[var(--dp-danger-ink)]"
        >
          {saveError}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4">
          <CreateImageSection
            images={images}
            onImagesChange={setImages}
          />
          <div className="hidden lg:block">
            <CreateFacebookCaption
              name={name}
              categoryLabel={categoryLabel}
              price={price}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-8">
          <CreateGeneralInfo
            name={name}
            category={category}
            price={price}
            stock={stock}
            description={description}
            images={images}
            onNameChange={setName}
            onCategoryChange={setCategory}
            onPriceChange={setPrice}
            onStockChange={setStock}
            onDescriptionChange={setDescription}
          />
        </div>
      </div>

      {/* Mobile-only: Facebook caption + Save button at the bottom */}
      <div className="mt-4 flex flex-col gap-4 lg:hidden">
        <CreateFacebookCaption
          name={name}
          categoryLabel={categoryLabel}
          price={price}
        />
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dp-green-900)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--dp-green-800)]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h8l4 4v14H6V3Z" />
            <path d="M14 3v4h4M9 12h6M9 16h6" />
          </svg>
          <span>{t('save', { ns: 'productDetail' }) || 'Save'}</span>
        </button>
      </div>
    </div>
  )
}
