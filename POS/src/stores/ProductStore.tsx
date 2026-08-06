import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { ProductItem, ProductStatus } from '../ShopOwner/Product/Productlist/components/ProductTypes'
import { ProductStoreContext, type CreateProductInput, type ProductSortKey, type ProductStoreContextValue } from './ProductStoreContext'
import { loadProducts, saveProducts } from '../ShopOwner/Product/ProductData'

interface ProductStoreState {
  products: ProductItem[]
  selectedProductId: string | null
  query: string
  categoryFilter: string
  sortKey: ProductSortKey
  loading: boolean
  error: string | null
}

type ProductStoreAction =
  | { type: 'setProducts'; products: ProductItem[] }
  | { type: 'setLoading'; loading: boolean }
  | { type: 'setError'; error: string | null }
  | { type: 'setQuery'; query: string }
  | { type: 'setCategoryFilter'; categoryFilter: string }
  | { type: 'setSortKey'; sortKey: ProductSortKey }
  | { type: 'selectProduct'; id: string | null }
  | { type: 'createProduct'; product: ProductItem }
  | { type: 'updateProduct'; product: ProductItem }
  | { type: 'deleteProduct'; id: string }

const createProductStatus = (stock: number): ProductStatus => {
  if (stock <= 0) return 'outOfStock'
  if (stock <= 5) return 'lowStock'
  return 'inStock'
}

const formatPrice = (price: string): string => {
  const numericPrice = Number(price)
  if (Number.isNaN(numericPrice)) return price
  return `$${numericPrice.toFixed(2)}`
}

const buildProduct = (input: CreateProductInput): ProductItem => {
  const id = `product-${Date.now()}`
  const sku = input.name.toLowerCase().replace(/\s+/g, '-') + `-${Math.random().toString(36).slice(2, 8)}`
  const variants = input.variants ? input.variants : []

  return {
    id,
    name: input.name,
    sku,
    image: input.image ?? 'placeholder.svg',
    images: input.images && input.images.length > 0 ? input.images : input.image ? [input.image] : undefined,
    category: input.category,
    price: formatPrice(input.price),
    stock: Math.max(input.stock, 0),
    status: createProductStatus(Math.max(input.stock, 0)),
    variants,
    description: input.description,
  }
}

const initialState: ProductStoreState = {
  products: loadProducts(),
  selectedProductId: null,
  query: '',
  categoryFilter: 'all',
  sortKey: 'newest',
  loading: false,
  error: null,
}

const productReducer = (state: ProductStoreState, action: ProductStoreAction): ProductStoreState => {
  switch (action.type) {
    case 'setProducts':
      return { ...state, products: action.products }
    case 'setLoading':
      return { ...state, loading: action.loading }
    case 'setError':
      return { ...state, error: action.error }
    case 'setQuery':
      return { ...state, query: action.query }
    case 'setCategoryFilter':
      return { ...state, categoryFilter: action.categoryFilter }
    case 'setSortKey':
      return { ...state, sortKey: action.sortKey }
    case 'selectProduct':
      return { ...state, selectedProductId: action.id }
    case 'createProduct':
      return { ...state, products: [action.product, ...state.products], selectedProductId: action.product.id }
    case 'updateProduct':
      return {
        ...state,
        products: state.products.map((product) => (product.id === action.product.id ? action.product : product)),
      }
    case 'deleteProduct':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
        selectedProductId: state.selectedProductId === action.id ? null : state.selectedProductId,
      }
    default:
      return state
  }
}

export function ProductStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState)

  // Persist products to localStorage whenever they change.
  // Uses the shared quota-aware saveProducts which progressively compresses
  // images if the write would exceed the storage quota.
  useEffect(() => {
    void saveProducts(state.products)
  }, [state.products])

  const fetchProducts = useCallback(() => {
    dispatch({ type: 'setLoading', loading: true })
    dispatch({ type: 'setError', error: null })

    globalThis.setTimeout(() => {
      dispatch({ type: 'setProducts', products: loadProducts() })
      dispatch({ type: 'setLoading', loading: false })
    }, 120)
  }, [])

  const setQuery = useCallback((query: string) => dispatch({ type: 'setQuery', query }), [])
  const setCategoryFilter = useCallback((categoryFilter: string) => dispatch({ type: 'setCategoryFilter', categoryFilter }), [])
  const setSortKey = useCallback((sortKey: ProductSortKey) => dispatch({ type: 'setSortKey', sortKey }), [])
  const selectProduct = useCallback((id: string | null) => dispatch({ type: 'selectProduct', id }), [])

  const createProduct = useCallback((input: CreateProductInput) => {
    const product = buildProduct(input)
    dispatch({ type: 'createProduct', product })
    return product
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<ProductItem>) => {
    const current = state.products.find((product) => product.id === id)
    if (!current) return

    const nextProduct: ProductItem = {
      ...current,
      ...updates,
      id,
      status: updates.stock !== undefined ? createProductStatus(updates.stock) : current.status,
      variants: updates.variants ?? current.variants,
    }

    dispatch({ type: 'updateProduct', product: nextProduct })
  }, [state.products])

  const deleteProduct = useCallback((id: string) => dispatch({ type: 'deleteProduct', id }), [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = state.query.trim().toLowerCase()

    const filtered = state.products.filter((product) => {
      const matchesQuery = [product.name, product.sku, product.category].some((value) => value.toLowerCase().includes(normalizedQuery))
      const matchesCategory = state.categoryFilter === 'all' || product.category === state.categoryFilter
      return matchesQuery && matchesCategory
    })

    if (state.sortKey === 'priceAsc') {
      return [...filtered].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)))
    }
    if (state.sortKey === 'priceDesc') {
      return [...filtered].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)))
    }
    if (state.sortKey === 'stockAsc') {
      return [...filtered].sort((a, b) => a.stock - b.stock)
    }
    if (state.sortKey === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (state.sortKey === 'oldest') {
      return [...filtered].reverse()
    }

    return filtered
  }, [state.categoryFilter, state.products, state.query, state.sortKey])

  const selectedProduct = useMemo(
    () => state.products.find((product) => product.id === state.selectedProductId) ?? null,
    [state.products, state.selectedProductId],
  )

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const value = useMemo<ProductStoreContextValue>(
    () => ({
      products: state.products,
      selectedProduct,
      filteredProducts,
      query: state.query,
      categoryFilter: state.categoryFilter,
      sortKey: state.sortKey,
      loading: state.loading,
      error: state.error,
      setQuery,
      setCategoryFilter,
      setSortKey,
      selectProduct,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [createProduct, deleteProduct, fetchProducts, filteredProducts, selectedProduct, setCategoryFilter, setQuery, setSortKey, selectProduct, state.categoryFilter, state.error, state.loading, state.products, state.query, state.sortKey, updateProduct],
  )

  return <ProductStoreContext.Provider value={value}>{children}</ProductStoreContext.Provider>
}