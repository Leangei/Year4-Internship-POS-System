import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductFilters from './components/ProductFilters'
import ProductHeader from './components/ProductHeader'
import ProductList from './components/ProductList'
import type { ProductItem } from './components/ProductTypes'

const initialProducts: ProductItem[] = [
  {
    id: '1',
    name: 'Cap',
    sku: '4557d20d-210e-499a-b00a-4ee31660eda0',
    image: 'https://damreipos.com/uploads/product-images/4557d20d-210e-499a-b00a-4ee31660eda0/1785332867611-0.jpg',
    category: 'Accessories',
    price: '$8.00',
    stock: 80,
    status: 'inStock',
    variants: [
      { label: 'XL / ខ្មៅ ', stock: 10 },
      { label: 'XL / ខៀវ ', stock: 10 },
      { label: 'M / ខ្មៅ ', stock: 10 },
      { label: 'M / ខៀវ', stock: 10 },
    ],
  },
  {
    id: '2',
    name: "Man's shoe",
    sku: '7de1b743-6b71-4484-bf5a-59fee8a5a387',
    image: 'https://damreipos.com/uploads/product-images/7de1b743-6b71-4484-bf5a-59fee8a5a387/1785128194175-0.png',
    category: 'Footwear',
    price: '$20.00',
    stock: 6,
    status: 'lowStock',
    variants: [
      { label: 'ខ្មៅ / S', stock: 4 },
      { label: 'ស / L ', stock: 2, lowStock: true },
      { label: 'ខៀវ / M ', stock: 0, lowStock: true },
    ],
  },
  {
    id: '3',
    name: 'shoe',
    sku: 'db88c979-38c6-4a0a-95c5-9087d8fdeb4b',
    image: 'https://damreipos.com/uploads/product-images/db88c979-38c6-4a0a-95c5-9087d8fdeb4b/1785128137756-0.png',
    category: 'Footwear',
    price: '$2.00',
    stock: 5,
    status: 'lowStock',
    variants: [
      { label: 'S / ខ្មៅ', stock: 5 },
      { label: 'S / ខៀវ', stock: 0, lowStock: true },
    ],
  },
  {
    id: '4',
    name: 'clothes',
    sku: 'ef492630-7902-4a0b-81cc-a886b299a624',
    image: 'https://damreipos.com/uploads/product-images/ef492630-7902-4a0b-81cc-a886b299a624/1785128066481-0.jpg',
    category: 'Apparel',
    price: '$10.00',
    stock: 10,
    status: 'inStock',
    variants: [
      { label: 'S / ខ្មៅ', stock: 5 },
    ],
  },
  {
    id: '5',
    name: 'Dior Lipstick',
    sku: '56d5e931-9ea6-4e7c-aa0b-ef491030090a',
    image: 'https://damreipos.com/uploads/product-images/56d5e931-9ea6-4e7c-aa0b-ef491030090a/1785122512321-0.jpg',
    category: 'Beauty',
    price: '$49.00',
    stock: 8,
    status: 'inStock',
    variants: [
      { label: '100ml', stock: 8 },
    ],
  },
  {
    id: '6',
    name: 'Cap',
    sku: '371c1d78-680a-4227-bd40-d2fd7b7fefde',
    image: 'https://damreipos.com/uploads/product-images/371c1d78-680a-4227-bd40-d2fd7b7fefde/1785118913248-0.jpg',
    category: 'Accessories',
    price: '$2.00',
    stock: 8,
    status: 'lowStock',
    variants: [
      { label: 'ខៀវ', stock: 2, lowStock: true },
      { label: 'ខ្មៅ', stock: 6 },
    ],
  },
]

const sortOptions = [
  'newest',
  'oldest',
  'priceDesc',
  'priceAsc',
  'stockAsc',
  'name',
] as const

const categoryOptions = [
  { value: 'all', labelKey: 'all', icon: 'all' as const },
  { value: 'Apparel', labelKey: 'clothing', icon: 'clothing' as const },
  { value: 'Beauty', labelKey: 'cosmetics', icon: 'cosmetics' as const },
  { value: 'Footwear', labelKey: 'shoes', icon: 'shoes' as const },
  { value: 'Accessories', labelKey: 'accessories', icon: 'accessories' as const },
] as const

export default function ProductPage() {
  const { t } = useTranslation('product')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<typeof sortOptions[number]>('newest')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = initialProducts.filter((product) => {
      const matchesQuery = [product.name, product.sku, product.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      )

      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter

      return matchesQuery && matchesCategory
    })

    if (sortKey === 'priceAsc') {
      return [...filtered].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)))
    }
    if (sortKey === 'priceDesc') {
      return [...filtered].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)))
    }
    if (sortKey === 'stockAsc') {
      return [...filtered].sort((a, b) => a.stock - b.stock)
    }
    if (sortKey === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortKey === 'oldest') {
      return [...filtered].reverse()
    }

    return filtered
  }, [query, sortKey, categoryFilter])

  const categoryOptionLabels = categoryOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
    icon: option.icon,
  }))

  return (
    <div className="flex flex-col gap-[10px] lg:gap-8">
      <ProductHeader total={initialProducts.length} />

      <ProductFilters
        query={query}
        setQuery={setQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categoryOptions={categoryOptionLabels}
        sortKey={sortKey}
        setSortKey={(value) => setSortKey(value as typeof sortOptions[number])}
        sortOptions={sortOptions}
        t={t}
      />

      <ProductList products={filteredProducts} />
    </div>
  )
}