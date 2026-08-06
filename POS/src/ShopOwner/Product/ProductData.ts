import type { ProductItem, ProductVariant } from './Productlist/components/ProductTypes'
import { compressProductsToFit, estimateProductImageBytes } from '../../utils/imageCompression'

const PRODUCTS_STORAGE_KEY = 'posProducts'

/** localStorage quota is ~5MB in most browsers; leave headroom for other keys. */
const STORAGE_TARGET_BYTES = 4_000_000

const createProductStatus = (stock: number) => {
  if (stock <= 0) return 'outOfStock' as const
  if (stock <= 5) return 'lowStock' as const
  return 'inStock' as const
}

const normalizePrice = (price: string) => {
  const numeric = Number(price.toString().replace(/[^0-9.]/g, ''))
  return Number.isNaN(numeric) ? price : `$${numeric.toFixed(2)}`
}

const normalizeCategory = (category: string) => {
  switch (category) {
    case 'clothes':
      return 'Apparel'
    case 'cosmetics':
      return 'Beauty'
    case 'shoes':
      return 'Footwear'
    case 'accessories':
      return 'Accessories'
    default:
      return category
  }
}

export interface ProductSaveInput {
  name: string
  category: string
  price: string
  stock: number
  description?: string
  images?: string[]
  variants?: ProductVariant[]
}

const normalizeProducts = (products: ProductItem[]): ProductItem[] =>
  products.map((product) => ({
    ...product,
    variants: Array.isArray(product.variants) ? product.variants : [],
    images: Array.isArray(product.images) ? product.images : product.image ? [product.image] : [],
    stock: Math.max(Number(product.stock) || 0, 0),
    status: product.status ?? createProductStatus(Math.max(Number(product.stock) || 0, 0)),
  }))

const readStoredProducts = (): ProductItem[] => {
  if (typeof window === 'undefined') {
    return normalizeProducts(initialProducts)
  }

  const stored = window.localStorage.getItem(PRODUCTS_STORAGE_KEY)

  if (!stored) {
    return normalizeProducts(initialProducts)
  }

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? normalizeProducts(parsed) : normalizeProducts(initialProducts)
  } catch {
    return normalizeProducts(initialProducts)
  }
}

export const initialProducts: ProductItem[] = [
  {
    id: '1',
    name: 'Cap',
    sku: '4557d20d-210e-499a-b00a-4ee31660eda0',
    image: 'cap.svg',
    images: ['cap.svg'],
    category: 'Accessories',
    price: '$8.00',
    stock: 80,
    status: 'inStock',
    description: 'A classic cap made for everyday wear, with breathable fabric and a comfortable fit.',
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
    image: 'p-shoe.svg',
    images: ['p-shoe.svg'],
    category: 'Footwear',
    price: '$20.00',
    stock: 6,
    status: 'lowStock',
    description: "Comfortable men's shoe with stylish detailing and support for all-day wear.",
    variants: [
      { label: 'ខ្មៅ / S', stock: 4 },
      { label: 'ស / L ', stock: 2, lowStock: true },
      { label: 'ខៀវ / M ', stock: 0, lowStock: true },
    ],
  },
  {
    id: '3',
    name: 'clothes',
    sku: 'ef492630-7902-4e7c-aa0a-4e88b299a624',
    image: 'pink pant.svg',
    images: ['pink pant.svg'],
    category: 'Apparel',
    price: '$10.00',
    stock: 10,
    status: 'inStock',
    description: 'Light and fashionable apparel designed for comfort and everyday styling.',
    variants: [{ label: 'S / ខ្មៅ', stock: 5 }],
  },
  {
    id: '4',
    name: 'Dior Lipstick',
    sku: '56d5e931-9ea6-4e7c-aa0b-ef491030090a',
    image: 'dior lipstick.svg',
    images: ['dior lipstick.svg'],
    category: 'Beauty',
    price: '$49.00',
    stock: 8,
    status: 'inStock',
    description: 'High-pigment Dior lipstick with a smooth finish and long-lasting color.',
    variants: [{ label: '100ml', stock: 8 }],
  },
]

export const buildProductItem = (input: ProductSaveInput): ProductItem => {
  const id = `product-${Date.now()}`
  const rawSku = input.name.toLowerCase().replace(/\s+/g, '-')
  const sku = `${rawSku}-${Math.random().toString(36).slice(2, 8)}`

  return {
    id,
    name: input.name,
    sku,
    image: input.images && input.images.length > 0 ? input.images[0] : 'placeholder.svg',
    images: input.images,
    category: normalizeCategory(input.category),
    price: normalizePrice(input.price),
    stock: Math.max(input.stock, 0),
    status: createProductStatus(Math.max(input.stock, 0)),
    variants: input.variants ?? [],
    description: input.description,
  }
}

export const createAndSaveProduct = async (input: ProductSaveInput): Promise<ProductItem> => {
  const newProduct = buildProductItem(input)
  const existingProducts = readStoredProducts()
  const nextProducts = [newProduct, ...existingProducts]

  await saveProducts(nextProducts)
  return newProduct
}

const safeParseProducts = (value: string | null): ProductItem[] => {
  if (!value) return normalizeProducts(initialProducts)

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return normalizeProducts(initialProducts)
    return normalizeProducts(parsed)
  } catch {
    return normalizeProducts(initialProducts)
  }
}

export const loadProducts = (): ProductItem[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(PRODUCTS_STORAGE_KEY)

  if (!stored) {
    const seededProducts = normalizeProducts(initialProducts)
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(seededProducts))

    return seededProducts
  }

  return safeParseProducts(stored)
}

const tryWriteProducts = (products: ProductItem[]): boolean => {
  try {
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
    return true
  } catch {
    return false
  }
}

/**
 * Persist products to localStorage. If the write would exceed the storage
 * quota, images are progressively compressed (smaller dimensions + lower
 * quality) and the write is retried until it fits.
 */
export const saveProducts = async (products: ProductItem[]): Promise<void> => {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedProducts = normalizeProducts(products)

  // Fast path: try the write as-is first.
  if (tryWriteProducts(normalizedProducts)) {
    window.dispatchEvent(new Event(PRODUCTS_STORAGE_KEY))
    return
  }

  // Quota exceeded — progressively compress images until the data fits.
  const compressedProducts = await compressProductsToFit(normalizedProducts, STORAGE_TARGET_BYTES)

  if (tryWriteProducts(compressedProducts)) {
    window.dispatchEvent(new Event(PRODUCTS_STORAGE_KEY))
    return
  }

  // Even the most aggressive compression didn't fit. Surface a clear error.
  const totalImageBytes = compressedProducts.reduce(
    (sum, product) => sum + estimateProductImageBytes(product),
    0,
  )
  throw new Error(
    `Storage is full. The product images total ~${Math.round(totalImageBytes / 1024)}KB and cannot fit in browser storage. Try removing some images or using smaller photos.`,
  )
}

export const getProductById = (id: string) => loadProducts().find((product) => product.id === id)
