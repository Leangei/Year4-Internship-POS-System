import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Save } from 'lucide-react'
import ProductVariantBuilder, { type ProductVariantBuilderHandle } from '../ProductDetails/components/ProductVariantBuilder'
import { buildProductItem, loadProducts, saveProducts } from '../ProductData'
import type { ProductDraft, ProductVariant } from '../Productlist/components/ProductTypes'

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

export default function VariantBuilderPage() {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()
  const [draft] = useState<ProductDraft>(loadDraft)
  const [previewVariants, setPreviewVariants] = useState<ProductVariant[]>([])
  const builderRef = useRef<ProductVariantBuilderHandle>(null)

  const handleVariantsChange = useCallback((nextVariants: ProductVariant[]) => {
    setPreviewVariants(nextVariants)
  }, [])

  const handleSave = () => {
    try {
      // Read the latest variants synchronously from the builder
      const finalVariants = builderRef.current?.getVariants() ?? previewVariants

      const newProduct = buildProductItem({
        name: draft.name || 'Unnamed product',
        category: draft.category || 'clothes',
        price: draft.price || '0',
        stock: Number(draft.stock) || 0,
        description: draft.description,
        images: draft.images,
        variants: finalVariants,
      })

      const existingProducts = loadProducts()
      saveProducts([newProduct, ...existingProducts])
      sessionStorage.removeItem('posProductDraft')
      navigate('/shopOwner/products')
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="cat-page">
      {/* Breadcrumb */}
      <div className="cat-crumb">
        <button
          type="button"
          className="dp-btn dp-btn--ghost dp-btn--sm dp-btn--bare"
          onClick={() => navigate(-1)}
          aria-label={t('back') || 'ត្រឡប់ក្រោយ'}
        >
          <span className="dp-btn__ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Header */}
      <header className="dp-pagehead">
        <div className="dp-pagehead__main">
          <h1 className="dp-pagehead__title">
            <span>{t('createProduct') || 'បង្កើតផលិតផលថ្មី'}</span>
          </h1>
          <p className="dp-pagehead__sub">
            {draft.name ? draft.name : (t('variantHintMessage') || 'បំពេញព័ត៌មាន ដើម្បីបន្ថែមផលិតផលថ្មីទៅក្នុងបញ្ជីរបស់អ្នក។')}
          </p>
        </div>
        <div className="dp-pagehead__right">
          <button
            type="button"
            className="dp-btn dp-btn--outline dp-btn--lg"
            onClick={handleCancel}
          >
            <span className="dp-btn__label">{t('cancel') || 'បោះបង់'}</span>
          </button>
          <button
            type="button"
            className="dp-btn dp-btn--primary dp-btn--lg"
            onClick={handleSave}
          >
            <span className="dp-btn__ico">
              <Save size={20} strokeWidth={1.9} />
            </span>
            <span className="dp-btn__label">{t('save') || 'រក្សាទុក'}</span>
          </button>
        </div>
      </header>

      <ProductVariantBuilder ref={builderRef} onVariantsChange={handleVariantsChange} />
    </div>
  )
}