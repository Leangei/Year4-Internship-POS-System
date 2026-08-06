import type { ProductItem } from '../ShopOwner/Product/Productlist/components/ProductTypes'

/**
 * Extract numeric prices from a product's variants.
 * Returns an array of numbers (empty if no variant has a price).
 */
export const getVariantPrices = (product: ProductItem): number[] => {
  const prices = (product.variants ?? [])
    .map((variant) => {
      const numeric = Number(String(variant.price ?? '').replace(/[^0-9.]/g, ''))
      return Number.isNaN(numeric) ? null : numeric
    })
    .filter((price): price is number => price !== null && price > 0)

  return prices
}

/**
 * Get the lowest variant price formatted as "$X.XX".
 * Falls back to the product's own price if no variant prices exist.
 */
export const getLowestVariantPrice = (product: ProductItem): string => {
  const prices = getVariantPrices(product)
  if (prices.length === 0) return product.price

  const lowest = Math.min(...prices)
  return `$${lowest.toFixed(2)}`
}

/**
 * Get a price range string like "$14.00 - $45.00" from variant prices.
 * Falls back to the product's own price if no variant prices exist.
 */
export const getVariantPriceRange = (product: ProductItem): string => {
  const prices = getVariantPrices(product)
  if (prices.length === 0) return product.price

  const lowest = Math.min(...prices)
  const highest = Math.max(...prices)

  if (lowest === highest) return `$${lowest.toFixed(2)}`
  return `$${lowest.toFixed(2)} - $${highest.toFixed(2)}`
}