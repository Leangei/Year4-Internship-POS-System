import { ShoppingBag, DollarSign, Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ProductItem } from '../../Productlist/components/ProductTypes'

interface ProductStatsProps {
  product: ProductItem
}

export default function ProductStats({ product }: ProductStatsProps) {
  const { t } = useTranslation('productDetail')

  const stats = [
    {
      title: t('totalVariants') || 'Total variants',
      value: product.variants.length.toString(),
      icon: ShoppingBag,
      style: 'bg-[#00351B] text-white',
    },
    {
      title: t('price') || 'Price',
      value: product.price,
      icon: DollarSign,
      style: 'bg-[#BAF911] text-[#00351B]',
    },
    {
      title: t('totalInStock') || 'In stock',
      value: product.stock.toString(),
      icon: Package,
      style: 'bg-white border border-[#E7E8E9]',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className={`rounded-[16px] p-5 ${item.style}`}>
            <div className="flex justify-between">
              <span className="text-sm">{item.title}</span>
              <Icon size={22} />
            </div>
            <h2 className="mt-5 text-3xl font-bold">{item.value}</h2>
          </div>
        )
      })}
    </div>
  )
}
