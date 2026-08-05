import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CreateProductHeader from './components/CreateProductHeader'
import CreateImageSection from './components/CreateImageSection'
import CreateGeneralInfo from './components/CreateGeneralInfo'
import { createAndSaveProduct } from '../ProductData'

export default function CreateProduct() {
  const navigate = useNavigate()
  const { t } = useTranslation(['product', 'productDetail'])

  const [name, setName] = useState('')
  const [category, setCategory] = useState('clothes')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])

  const categoryLabel = useMemo(() => {
    switch (category) {
      case 'cosmetics':
        return t('cosmetics', { ns: 'productDetail' }) || 'Cosmetics'
      case 'shoes':
        return t('shoes', { ns: 'productDetail' }) || 'Shoes'
      case 'accessories':
        return t('accessories', { ns: 'productDetail' }) || 'Accessories'
      case 'other':
        return t('other', { ns: 'productDetail' }) || 'Other'
      case 'clothes':
      default:
        return t('clothing', { ns: 'productDetail' }) || 'Clothing'
    }
  }, [category, t])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = () => {
    try {
      const newProduct = createAndSaveProduct({
        name: name || 'Unnamed product',
        category,
        price: price || '0',
        stock: Number(stock) || 0,
        description,
        images,
        variants: [],
      })

      console.log('Product saved:', newProduct)
      navigate('/shopOwner/products')
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-3 sm:p-4 lg:p-8">
      <CreateProductHeader
        productName={name || t('createProduct', { ns: 'product' }) || 'Create Product'}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <div className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4">
          <CreateImageSection
            name={name}
            categoryLabel={categoryLabel}
            price={price}
            images={images}
            onImagesChange={setImages}
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-8">
          <CreateGeneralInfo
            name={name}
            category={category}
            price={price}
            stock={stock}
            description={description}
            images={images}
            onNameChange={setName}
            onCategoryChange={setCategory}
            onPriceChange={setPrice}
            onStockChange={setStock}
            onDescriptionChange={setDescription}
          />
        </div>
      </div>
    </div>
  )
}
