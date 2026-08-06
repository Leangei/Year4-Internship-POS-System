import { useMemo, useState } from 'react'
import type { ProductItem } from '../../Productlist/components/ProductTypes'

interface ProductGalleryProps {
  product: ProductItem
}

const imageModules = import.meta.glob('../../../../assets/product/*.{svg,png,jpg,jpeg}', { eager: true }) as Record<
  string,
  { default: string }
>

const imageMap = Object.entries(imageModules).reduce<Record<string, string>>((map, [path, module]) => {
  const fileName = path.split('/').pop() ?? ''
  map[fileName] = module.default
  return map
}, {})

const resolveImage = (image: string) => {
  if (/^https?:\/\//.test(image) || image.startsWith('/') || image.startsWith('data:')) {
    return image
  }

  return imageMap[image] || image
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => {
    const sourceImages = product.images && product.images.length > 0 ? product.images : [product.image]
    return sourceImages.map((image) => resolveImage(image))
  }, [product.images, product.image])

  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-4 sm:p-5">
      <div className="flex h-[220px] sm:h-[360px] items-center justify-center rounded-xl bg-[#F3F4F3]">
        <img src={activeImage} alt={product.name} className="h-full w-full rounded-xl object-cover" />
      </div>

      <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
              activeImage === image ? 'border-[#00351B]' : 'border-[#E7E8E9]'
            }`}
          >
            <img src={image} alt={product.name} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
