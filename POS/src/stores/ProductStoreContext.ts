import { createContext } from 'react'
import type { ProductItem, ProductVariant } from '../ShopOwner/Product/Productlist/components/ProductTypes'

export type ProductSortKey = 'newest' | 'oldest' | 'priceAsc' | 'priceDesc' | 'stockAsc' | 'name'

export type CreateProductInput = {
  name: string
  category: string
  price: string
  stock: number
  description?: string
  image?: string
  images?: string[]
  variants?: ProductVariant[]
}

export interface ProductStoreContextValue {
  products: ProductItem[]
  selectedProduct: ProductItem | null
  filteredProducts: ProductItem[]
  query: string
  categoryFilter: string
  sortKey: ProductSortKey
  loading: boolean
  error: string | null
  setQuery: (query: string) => void
  setCategoryFilter: (categoryFilter: string) => void
  setSortKey: (sortKey: ProductSortKey) => void
  selectProduct: (id: string | null) => void
  fetchProducts: () => void
  createProduct: (input: CreateProductInput) => ProductItem
  updateProduct: (id: string, updates: Partial<ProductItem>) => void
  deleteProduct: (id: string) => void
}

export const ProductStoreContext = createContext<ProductStoreContextValue>({
  products: [],
  selectedProduct: null,
  filteredProducts: [],
  query: '',
  categoryFilter: 'all',
  sortKey: 'newest',
  loading: false,
  error: null,
  setQuery: () => {},
  setCategoryFilter: () => {},
  setSortKey: () => {},
  selectProduct: () => {},
  fetchProducts: () => {},
  createProduct: () => {
    throw new Error('ProductStoreContext is not available')
  },
  updateProduct: () => {},
  deleteProduct: () => {},
})
