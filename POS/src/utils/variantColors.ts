import type { ProductVariant } from '../ShopOwner/Product/Productlist/components/ProductTypes'

const COLOR_ATTRIBUTE_KEYS = ['color', 'Color', 'ពណ៌']
const SIZE_TOKENS = new Set(['S', 'M', 'L', 'XL', 'XXL', 'XS', '3XL', '4XL', 'ស', 'ម', 'ធំ'])

/**
 * Extract unique color values from a product's variants.
 *
 * Handles all attribute key formats:
 * - Create flow stores the attribute key as lowercase `color`.
 * - Edit flow stores the column NAME as the key, which can be "Color" (English) or "ពណ៌" (Khmer).
 *
 * Falls back to parsing the variant label for products without structured attributes
 * (e.g. legacy seed data), e.g. "White / S" → "White".
 */
export const getUniqueVariantColors = (variants: ProductVariant[] | undefined): string => {
  const colors = (variants ?? [])
    .map((variant) => {
      // 1. Try structured attributes with all known color keys
      if (variant.attributes) {
        const colorValue = Object.entries(variant.attributes).find(([key]) =>
          COLOR_ATTRIBUTE_KEYS.includes(key),
        )?.[1]
        if (colorValue) return colorValue
      }

      // 2. Fallback: parse the label — find the first non-size token
      //    e.g. "White / S" → "White", "S / White" → "White"
      if (variant.label) {
        const parts = variant.label.split(' / ').map((p) => p.trim())
        const colorPart = parts.find((p) => !SIZE_TOKENS.has(p))
        if (colorPart) return colorPart
      }

      return ''
    })
    .filter(Boolean)

  return Array.from(new Set(colors)).join(', ')
}