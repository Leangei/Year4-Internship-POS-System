import { useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { compressImageFile } from '../../../../utils/imageCompression'

interface CreateImageSectionProps {
  images: string[]
  onImagesChange: (images: string[]) => void
}

export default function CreateImageSection({ images, onImagesChange }: CreateImageSectionProps) {
  const { t } = useTranslation('productDetail')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    try {
      const nextImages = await Promise.all(files.map((file) => compressImageFile(file)))
      onImagesChange([...images, ...nextImages])
    } catch (error) {
      console.error('Failed to process images:', error)
    }
    e.target.value = ''
  }

  const handleRemove = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="rounded-[20px] border border-[#E7E8E9] bg-white p-5">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--dp-ink)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="block flex-shrink-0" aria-hidden="true">
            <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20.5 16" />
          </svg>
          {t('images') || 'Images'}
        </h2>

        <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center gap-2 rounded-[18px] border border-dashed border-[#C0C9BF] bg-gradient-to-b from-[#fbfcfb] to-[#f4f6f3] p-5 text-center text-[var(--dp-body)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,53,27,0.08)] text-[var(--dp-green-900)]">
            <ImagePlus size={24} strokeWidth={1.9} />
          </span>
          <span className="text-[15px] font-semibold text-[var(--dp-ink)]">{t('uploadImage') || 'Upload images'}</span>
          <span className="text-xs text-[var(--dp-muted)]">{t('uploadHint') || 'Add up to 5 images (JPG, PNG)'}</span>
        </button>

        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2.5">
            {images.map((image, index) => (
              <div key={`${image}-${index}`} className="relative h-16 w-16">
                <div className="h-full w-full overflow-hidden rounded-lg border border-[#E7E8E9] bg-[var(--dp-surface-2)]">
                  <img src={image} alt="Product upload preview" className="h-full w-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label={t('deleteImage') || 'Delete this image'}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C82121] text-white transition-colors hover:bg-[#004d24]"
                >
                  <X size={13} strokeWidth={2.4} />
                </button>
              </div>
            ))}
          </div>
        )}

        <input ref={fileInputRef} className="hidden" type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={handleFilesSelected} />
      </div>

    </div>
  )
}
