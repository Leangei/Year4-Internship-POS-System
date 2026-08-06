import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailHeader from './components/ProductDetailHeader'
import ProductGallery from './components/ProductGallery'
import ProductInfoCard from './components/ProductInfo'
import ProductDescription from './components/ProductDescription'
import ProductStats from './components/ProductStats'
import ProductVariantTable from './components/ProductVariantTable'
import FacebookCaption from './components/FacebookCaption'
import { getProductById } from '../ProductData'
import { getUniqueVariantColors } from '../../../utils/variantColors'

export default function ProductDetail() {
  const { t } = useTranslation('productDetail')
  const { id } = useParams()
  const navigate = useNavigate()

  const product = useMemo(
    () => (id ? getProductById(id) : undefined),
    [id],
  )

  useEffect(() => {
    if (!product) {
      navigate('/shopOwner/products')
    }
  }, [navigate, product])

  if (!product) {
    return null
  }

  return (
    <div className="p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6">
      <ProductDetailHeader productId={product.id} productName={product.name} productSku={product.sku} />

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          <ProductGallery product={product} />
          <div className="hidden lg:block">
            <FacebookCaption
              name={product.name}
              price={product.price}
              colors={getUniqueVariantColors(product.variants)}
            />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
          <ProductInfoCard product={product} />
          <ProductStats product={product} />
          <ProductDescription description={product.description} />
          <ProductVariantTable variants={product.variants} price={product.price} />
          <button
            type="button"
            onClick={() => navigate('/shopOwner/orders')}
            className="w-full rounded-xl bg-[#00351B] py-3.5 font-semibold text-white text-sm cursor-pointer hover:bg-[#004d24] transition-colors"
          >
            + {t('addNewOrder')}
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <FacebookCaption
          name={product.name}
          price={product.price}
          colors={getUniqueVariantColors(product.variants)}
        />
      </div>
    </div>
  )
}
