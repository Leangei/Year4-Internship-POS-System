import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProductDetailHeader from './components/ProductDetailHeader'
import ProductGallery from './components/ProductGallery'
import ProductInfoCard from './components/ProductInfo'
import ProductDescription from './components/ProductDescription'
import ProductStats from './components/ProductStats'
import ProductVariantBuilder from './components/ProductVariantBuilder'
import FacebookCaption from './components/FacebookCaption'


export default function ProductDetail() {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()
  return (
    <div className="p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6">

      {/* 1. Header */}
      <ProductDetailHeader
        productId="4557d20d-210e-499a-b00a-4ee31660eda0"
        productName="Cap"
      />

      {/* Mobile: single column | Desktop: 2-column grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6">

        {/* Left Column (Mobile: Gallery first | Desktop: Gallery + FacebookCaption) */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          {/* 2. Product Image Gallery */}
          <ProductGallery />

          {/* 7. Facebook Caption (desktop: left column, mobile: after variant table) */}
          <div className="hidden lg:block">
            <FacebookCaption />
          </div>
        </div>

        {/* Right Column (Desktop: Info + Stats + Description + VariantTable) */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
          {/* 3. Product Information Card */}
          <ProductInfoCard />

          {/* 4. Statistics Cards */}
          <ProductStats />

          {/* 5. Description */}
          <ProductDescription />

          {/* 6. Variant Builder */}
          <ProductVariantBuilder />
        </div>

      </div>

      {/* 7. Facebook Caption (mobile only - after the grid) */}
      <div className="lg:hidden">
        <FacebookCaption />
      </div>

      {/* 8. Bottom Action Button */}
      <button
        type="button"
        onClick={() => navigate('/shopOwner/products/1/edit')}
        className="
          w-full
          rounded-xl
          bg-[#00351B]
          py-3.5
          font-semibold
          text-white
          text-sm
          cursor-pointer
          hover:bg-[#004d24]
          transition-colors
        "
      >
        {t('editProduct')}
      </button>

    </div>
  )
}