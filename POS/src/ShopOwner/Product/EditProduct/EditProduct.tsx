import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EditProductHeader from './components/EditProductHeader'
import EditImageGallery from './components/EditImageGallery'
import EditGeneralInfo from './components/EditGeneralInfo'
import EditVariantTable from './components/EditVariantTable'
import FacebookCaption from '../ProductDetails/components/FacebookCaption'
import { getProductById, loadProducts, saveProducts } from '../ProductData'
import { getUniqueVariantColors } from '../../../utils/variantColors'
import type { ProductStatus, ProductVariant } from '../Productlist/components/ProductTypes'

export default function EditProduct() {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined

  const [name, setName] = useState(product?.name ?? '')
  const [category, setCategory] = useState(product?.category ?? 'clothes')
  const [price, setPrice] = useState(product?.price ? product.price.replace('$', '') : '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants ?? [])
  const [saveError, setSaveError] = useState('')

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    setSaveError('')
    if (!product) return

    try {
      const existingProducts = loadProducts()
      const nextProducts = existingProducts.map((p) =>
        p.id === product.id
          ? {
              ...p,
              name: name || p.name,
              category,
              price: price ? `$${Number(price).toFixed(2)}` : p.price,
              description,
              images,
              image: images[0] ?? p.image,
              variants,
              stock: variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0),
              status: (variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0) <= 0
                ? 'outOfStock'
                : variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0) <= 5
                ? 'lowStock'
                : 'inStock') as ProductStatus,
            }
          : p,
      )
      await saveProducts(nextProducts)
      navigate(`/shopOwner/products/${product.id}`)
    } catch (error) {
      console.error('Failed to save product:', error)
      setSaveError('Failed to save product. Please try again.')
    }
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-[var(--dp-muted)]">
        Product not found.
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto pb-24 sm:pb-8">
      <EditProductHeader
        productName={name}
        sku={product.sku}
        productId={product.id}
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

      {/* key={product.id} forces a fresh mount so the saved data always loads */}
      <div key={product.id} className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          <EditImageGallery
            initialImages={images.map((src, i) => ({ id: `img-${i}`, src }))}
            onImagesChange={(imgs) => setImages(imgs.map((img) => img.src))}
          />
          <FacebookCaption
            name={name}
            price={price ? `$${price}` : product.price}
            colors={getUniqueVariantColors(variants)}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
          <EditGeneralInfo
            initialName={name}
            initialCategory={category}
            initialPrice={price}
            initialDescription={description}
            onNameChange={setName}
            onCategoryChange={setCategory}
            onPriceChange={setPrice}
            onDescriptionChange={setDescription}
          />
          <EditVariantTable
            initialVariants={variants}
            onVariantsChange={setVariants}
          />
        </div>
      </div>

      {/* Bottom action bar — mobile only, scrolls with page */}
      <div className="sm:hidden mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-full border border-[var(--dp-line)] bg-white text-[var(--dp-body)] font-semibold text-sm hover:bg-[var(--dp-surface-2)] transition-colors"
        >
          {t('cancel') || 'បោះបង់'}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[var(--dp-green-900)] text-white font-semibold text-sm hover:bg-[var(--dp-green-800)] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="block flex-shrink-0">
            <path d="M6 3h8l4 4v14H6V3Z" />
            <path d="M14 3v4h4M9 12h6M9 16h6" />
          </svg>
          <span>{t('save') || 'រក្សាទុក'}</span>
        </button>
      </div>
    </div>
  )
}