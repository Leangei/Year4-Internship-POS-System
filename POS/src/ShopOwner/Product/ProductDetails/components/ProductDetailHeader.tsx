import { ArrowLeft, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ProductDetailHeaderProps {
  productId: string
  productName: string
}

export default function ProductDetailHeader({
  productId,
  productName,
}: ProductDetailHeaderProps) {
  const { t } = useTranslation('productDetail')
  const navigate = useNavigate()

  return (
    <header
      className="
        flex
        items-start
        justify-between
        gap-4
        flex-wrap
        mb-5
      "
    >

      {/* Left */}
      <div className="flex items-start gap-3">

        <button
  type="button"
  onClick={() => navigate(-1)}
  aria-label="Back"
  className="
    inline-flex
    items-center
    justify-center
    w-10
    h-10
    rounded-[10px]
    bg-white
    border
    border-[var(--dp-line)]
    text-[var(--dp-body)]
    hover:bg-[var(--dp-surface-2)]
    transition
  "
>
  <ArrowLeft
    size={18}
    strokeWidth={1.9}
  />
</button>


        <div className="flex flex-col">

          {/* Product ID */}
          <span
            className="
              text-xs
              font-medium
              text-[var(--dp-muted)]
              tabular-nums
              mb-1
            "
          >
            #{productId}
          </span>


          {/* Title */}
      <h1
  className="
    text-[24px]
    leading-[1.35]
    font-bold
   text-[var(--dp-green-900)]
  "
>
            {t('productDetail')} : {productName}
          </h1>

        </div>

      </div>


      {/* Right */}
      <button
        type="button"
        onClick={() => navigate(`/shopOwner/products/${productId}/edit`)}
        className="
          inline-flex
          items-center
          gap-2
          px-5
          py-3
          rounded-full
          border
          border-[var(--dp-line)]
          bg-white
          text-[var(--dp-body)]
          font-semibold
          text-sm
          hover:bg-[var(--dp-surface-2)]
        "
      >
        <Pencil size={20} />
        {t('editProduct')}
      </button>

    </header>
  )
}