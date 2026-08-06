import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductFilters from './components/ProductFilters'
import ProductHeader from './components/ProductHeader'
import ProductList from './components/ProductList'
import type { ProductItem } from './components/ProductTypes'
import { loadProducts, saveProducts } from '../ProductData'

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
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<typeof sortOptions[number]>('newest')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [products, setProducts] = useState<ProductItem[]>(() => loadProducts())

  // Reload products whenever the page mounts, the route changes, or localStorage changes
  useEffect(() => {
    const refresh = () => setProducts(loadProducts())
    const handleStorage = () => refresh()

    refresh()
    window.addEventListener('posProducts', refresh)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('posProducts', refresh)
      window.removeEventListener('storage', handleStorage)
    }
  }, [location.key, location.pathname])

  const handleDelete = async (id: string) => {
    const nextProducts = products.filter((p) => p.id !== id)
    setProducts(nextProducts)
    await saveProducts(nextProducts)
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesQuery = [product.name, product.sku, product.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      )

      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter

      return matchesQuery && matchesCategory
    })

    const getCreatedAtValue = (product: ProductItem) => {
      const match = product.id.match(/^product-(\d+)/)
      return match ? Number(match[1]) : 0
    }

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
    if (sortKey === 'newest') {
      return [...filtered].sort((a, b) => getCreatedAtValue(b) - getCreatedAtValue(a))
    }

    return filtered
  }, [products, query, sortKey, categoryFilter])

  const categoryOptionLabels = categoryOptions.map((option) => ({
    value: option.value,
    label: t(`list.${option.labelKey}`),
    icon: option.icon,
  }))

  return (
    <div className="flex flex-col gap-[10px] lg:gap-8">
      <ProductHeader total={products.length} />

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

      <ProductList products={filteredProducts} onDelete={handleDelete} />
    </div>
  )
}
