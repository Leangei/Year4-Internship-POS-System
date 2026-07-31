import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Plus } from 'lucide-react'
import capImg from '../../../../assets/productdetail/cap.jpg'
import cap1Img from '../../../../assets/productdetail/cap1.jpg'
import cappImg from '../../../../assets/productdetail/capp.jpg'

interface ImageItem {
  id: string
  src: string
}

interface EditImageGalleryProps {
  initialImages?: ImageItem[]
}

export default function EditImageGallery({ initialImages = [] }: EditImageGalleryProps) {
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
    setImages((prev) => prev.filter((img) => img.id !== id))
    if (activeIndex >= idx && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newImages: ImageItem[] = Array.from(files).map((file, i) => ({
      id: `new-${Date.now()}-${i}`,
      src: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  return (
    <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--dp-ink)] mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="block flex-shrink-0">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20.5 16" />
        </svg>
        {t('images') || 'រូបភាព'}
      </h2>

      {/* Main Image */}
      {images.length > 0 && (
        <div className="relative rounded-xl overflow-hidden bg-[#F3F4F3] mb-4">
          <img
            src={images[activeIndex]?.src}
            alt=""
            className="w-full h-[280px] object-cover"
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
      <div className="flex gap-2.5 flex-wrap">
        {images.map((img, idx) => (
          <div key={img.id} className="relative w-16 h-16">
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
            w-16 h-16 rounded-lg border-2 border-dashed border-[#C0C9BF]
            flex flex-col items-center justify-center gap-0.5
            text-[#666666] text-xs
            hover:border-[#00351B] hover:text-[#00351B]
            transition-colors
          "
        >
          <Plus size={18} strokeWidth={2} />
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