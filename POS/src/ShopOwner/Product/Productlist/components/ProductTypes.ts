export type ProductStatus = 'inStock' | 'lowStock' | 'outOfStock'

export interface ProductVariant {
  label: string
  stock: number
  lowStock?: boolean
  price?: string
  /** Structured variant attributes, e.g. { size: 'XL', color: 'ខ្មៅ' } */
  attributes?: Record<string, string>
}

export interface ProductDraft {
  name: string
  category: string
  price: string
  stock: string
  description?: string
  images?: string[]
}

export interface ProductItem {
  id: string
  name: string
  sku: string
  image: string
  images?: string[]
  category: string
  price: string
  stock: number
  status: ProductStatus
  variants: ProductVariant[]
  description?: string
}
