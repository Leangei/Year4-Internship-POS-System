import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditProductHeader from './components/EditProductHeader'
import EditImageGallery from './components/EditImageGallery'
import EditGeneralInfo from './components/EditGeneralInfo'
import EditVariantTable from './components/EditVariantTable'
import FacebookCaption from '../ProductDetails/components/FacebookCaption'
import { getProductById, loadProducts, saveProducts } from '../ProductData'
import { getUniqueVariantColors } from '../../../utils/variantColors'
import type { ProductStatus, ProductVariant } from '../Productlist/components/ProductTypes'

export default function EditProduct() {
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
    <div className="p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto">
      <EditProductHeader
        productName={name}
        sku={product.sku}
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
    </div>
  )
}