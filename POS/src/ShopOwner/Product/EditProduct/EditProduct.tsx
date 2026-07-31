import EditProductHeader from './components/EditProductHeader'
import EditImageGallery from './components/EditImageGallery'
import EditGeneralInfo from './components/EditGeneralInfo'
import EditVariantTable from './components/EditVariantTable'
import FacebookCaption from '../ProductDetails/components/FacebookCaption'
import { useNavigate } from 'react-router-dom'

export default function EditProduct() {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save product')
  }

  return (
    <div className="p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto">
      <EditProductHeader
        productName="Cap"
        sku="4557d20d-210e-499a-b00a-4ee31660eda0"
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          <EditImageGallery />
          <FacebookCaption />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
          <EditGeneralInfo />
          <EditVariantTable />
        </div>
      </div>
    </div>
  )
}