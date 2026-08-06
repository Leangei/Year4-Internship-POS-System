import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Plus } from 'lucide-react'
import { compressImageFile } from '../../../../utils/imageCompression'
import capImg from '../../../../assets/productdetail/cap.jpg'
import cap1Img from '../../../../assets/productdetail/cap1.jpg'
import cappImg from '../../../../assets/productdetail/capp.jpg'

interface ImageItem {
  id: string
  src: string
}

interface EditImageGalleryProps {
  initialImages?: ImageItem[]
  onImagesChange?: (images: ImageItem[]) => void
}

export default function EditImageGallery({ initialImages = [], onImagesChange }: EditImageGalleryProps) {
  const { t } = useTranslation('productDetail')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<ImageItem[]>(() => {
    if (initialImages.length > 0) {
      return initialImages
    }

    return [
      { id: '1', src: capImg },
      { id: '2', src: cap1Img },
      { id: '3', src: cappImg },
    ]
  })
  const [activeIndex, setActiveIndex] = useState(0)

  const handleRemove = (id: string) => {
    const idx = images.findIndex((img) => img.id === id)
    setImages((prev) => {
      const next = prev.filter((img) => img.id !== id)
      onImagesChange?.(next)
      return next
    })
    if (activeIndex >= idx && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    try {
      const compressed = await Promise.all(
        Array.from(files).map((file) => compressImageFile(file)),
      )
      const newImages: ImageItem[] = compressed.map((src, i) => ({
        id: `new-${Date.now()}-${i}`,
        src,
      }))
      setImages((prev) => {
        const next = [...prev, ...newImages]
        onImagesChange?.(next)
        return next
      })
    } catch (error) {
      console.error('Failed to process images:', error)
    }
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-4 sm:p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--dp-ink)] mb-3 sm:mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="block flex-shrink-0">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20.5 16" />
        </svg>
        {t('images') || 'រូបភាព'}
      </h2>

      {/* Main Image */}
      {images.length > 0 && (
        <div className="relative rounded-xl overflow-hidden bg-[#F3F4F3] mb-3 sm:mb-4">
          <img
            src={images[activeIndex]?.src}
            alt=""
            className="w-full h-[220px] sm:h-[280px] object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemove(images[activeIndex].id)}
            aria-label={t('deleteImage') || 'លុបរូបភាពនេះ'}
            className="
              absolute top-2 right-2
              w-7 h-7 rounded-full
              bg-[#C82121] text-white
              flex items-center justify-center
              hover:bg-black/60 transition-colors
            "
          >
            <X size={15} strokeWidth={2.4} />
          </button>
        </div>
      )}

      {/* Thumbnails */}
      <div className="flex gap-2 sm:gap-2.5 flex-wrap">
        {images.map((img, idx) => (
          <div key={img.id} className="relative w-14 h-14 sm:w-16 sm:h-16">
            <button
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`
                w-full h-full rounded-lg overflow-hidden border-2
                ${activeIndex === idx ? 'border-[#00351B]' : 'border-[#E7E8E9]'}
              `}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </button>
            <button
              type="button"
              onClick={() => handleRemove(img.id)}
              aria-label={t('deleteImage') || 'លុបរូបភាពនេះ'}
              className="
                absolute -top-1.5 -right-1.5
                w-5 h-5 rounded-full
                bg-[#C82121] text-white
                flex items-center justify-center
                hover:bg-[#004d24] transition-colors
              "
            >
              <X size={13} strokeWidth={2.4} />
            </button>
          </div>
        ))}

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddClick}
          className="
            w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 border-dashed border-[#C0C9BF]
            flex flex-col items-center justify-center gap-0.5
            text-[#666666] text-[10px] sm:text-xs
            hover:border-[#00351B] hover:text-[#00351B]
            transition-colors
          "
        >
          <Plus size={16} strokeWidth={2} className="sm:hidden" />
          <Plus size={18} strokeWidth={2} className="hidden sm:block" />
          <span>{t('add') || 'បន្ថែម'}</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        tabIndex={-1}
        onChange={handleFilesSelected}
      />
    </div>
  )
}