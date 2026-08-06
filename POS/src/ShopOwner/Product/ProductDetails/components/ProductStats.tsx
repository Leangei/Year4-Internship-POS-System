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
      title: t('totalSold') || 'Total Sold',
      value: product.variants.length.toString(),
      icon: ShoppingBag,
      style: 'bg-[#00351B] text-white',
    },
    {
      title: t('totalRevenue') || 'Total Revenue',
      value: product.price,
      icon: DollarSign,
      style: 'bg-[#BAF911] text-[#00351B]',
    },
    {
      title: t('totalInStock') || 'Total In Stock',
      value: product.stock.toString(),
      icon: Package,
      style: 'bg-white border border-[#E7E8E9]',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className={`rounded-[16px] p-3.5 sm:p-5 ${item.style}`}>
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm">{item.title}</span>
              <Icon size={18} className="sm:hidden" />
              <Icon size={22} className="hidden sm:block" />
            </div>
            <h2 className="mt-3 sm:mt-5 text-2xl sm:text-3xl font-bold">{item.value}</h2>
          </div>
        )
      })}
    </div>
  )
}
