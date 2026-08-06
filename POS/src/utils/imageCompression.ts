/**
 * Shared image compression utilities.
 *
 * Product images are stored as base64 data URLs inside localStorage, which has
 * a hard quota (~5MB in most browsers). When that quota is exceeded,
 * `localStorage.setItem` throws a `QuotaExceededError`. To keep the app
 * reliable, we compress images aggressively on upload and, as a safety net,
 * progressively re-compress existing images when a save would exceed the quota.
 */

export interface CompressionOptions {
  /** Maximum width/height (longest edge) after scaling. */
  maxDimension?: number
  /** JPEG quality 0–1. Lower = smaller file. */
  quality?: number
}

const DEFAULT_MAX_DIMENSION = 800
const DEFAULT_QUALITY = 0.7

/** Estimate the byte size of a base64 data URL. */
export const estimateDataUrlBytes = (dataUrl: string): number => {
  // Strip the `data:...;base64,` prefix; base64 encodes 3 bytes as 4 chars.
  const commaIndex = dataUrl.indexOf(',')
  if (commaIndex === -1) return dataUrl.length
  const base64 = dataUrl.slice(commaIndex + 1)
  return Math.floor((base64.length * 3) / 4)
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })

const drawToCanvas = (
  img: HTMLImageElement,
  maxDimension: number,
): HTMLCanvasElement => {
  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
  const width = Math.max(1, Math.round(img.width * scale))
  const height = Math.max(1, Math.round(img.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas is not supported')
  }
  ctx.drawImage(img, 0, 0, width, height)
  return canvas
}

/**
 * Compress an existing data URL (e.g. a previously stored base64 image) into a
 * smaller JPEG data URL.
 */
export const compressDataUrl = async (
  dataUrl: string,
  options: CompressionOptions = {},
): Promise<string> => {
  const { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_QUALITY } = options
  const img = await loadImage(dataUrl)
  const canvas = drawToCanvas(img, maxDimension)
  return canvas.toDataURL('image/jpeg', quality)
}

/**
 * Compress a File (from an `<input type="file">`) into a JPEG data URL.
 */
export const compressImageFile = (
  file: File,
  options: CompressionOptions = {},
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      compressDataUrl(dataUrl, options)
        .then(resolve)
        .catch(reject)
    }
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

/**
 * Compress all base64 images in a product's `images` array. Returns a new
 * product object; the original is left untouched.
 */
export const compressProductImages = async <
  T extends { images?: string[]; image?: string },
>(
  product: T,
  options: CompressionOptions = {},
): Promise<T> => {
  const images = product.images ?? []
  if (images.length === 0) return product

  const compressed = await Promise.all(
    images.map((image) => compressDataUrl(image, options)),
  )

  return {
    ...product,
    images: compressed,
    image: compressed[0] ?? product.image,
  }
}

/**
 * Estimate the total byte size of a product's images.
 */
export const estimateProductImageBytes = (product: { images?: string[] }): number =>
  (product.images ?? []).reduce((sum, image) => sum + estimateDataUrlBytes(image), 0)

/**
 * Progressively compress images across a list of products until the total
 * serialized size fits under `targetBytes`. Returns a new array of products.
 *
 * Compression levels get progressively more aggressive on each pass:
 *   1. 640px @ 0.6
 *   2. 480px @ 0.5
 *   3. 320px @ 0.4
 *   4. 200px @ 0.35
 *
 * If even the most aggressive pass doesn't fit, the last result is returned
 * anyway (the caller can decide how to handle it).
 */
export const compressProductsToFit = async <T extends { images?: string[] }>(
  products: T[],
  targetBytes: number,
): Promise<T[]> => {
  const levels: CompressionOptions[] = [
    { maxDimension: 640, quality: 0.6 },
    { maxDimension: 480, quality: 0.5 },
    { maxDimension: 320, quality: 0.4 },
    { maxDimension: 200, quality: 0.35 },
  ]

  let current = products

  for (const level of levels) {
    const totalBytes = current.reduce(
      (sum, product) => sum + estimateProductImageBytes(product),
      0,
    )
    if (totalBytes <= targetBytes) {
      return current
    }

    // Compress every product that has images.
    current = await Promise.all(
      current.map((product) => compressProductImages(product, level)),
    )
  }

  return current
}