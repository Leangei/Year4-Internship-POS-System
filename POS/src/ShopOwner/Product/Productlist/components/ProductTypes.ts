export type ProductStatus = 'inStock' | 'lowStock' | 'outOfStock'

export interface ProductVariant {
  label: string
  stock: number
  lowStock?: boolean
}

export interface ProductItem {
  id: string
  name: string
  sku: string
  image: string
  category: string
  price: string
  stock: number
  status: ProductStatus
  variants: ProductVariant[]
}