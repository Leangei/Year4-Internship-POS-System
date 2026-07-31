import { Tag, Shirt, Sparkles, Footprints, Flower } from "lucide-react";
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { useTranslation } from "react-i18next";


export default function ProductInfoCard() {
  const { t } = useTranslation('productDetail')

  const category: string = 'Accessories'
  const CategoryIconComponent = (() => {
    switch (category) {
      case 'Apparel':
        return Shirt
      case 'Beauty':
        return Sparkles
      case 'Footwear':
        return Footprints
      case 'Accessories':
        return Flower
      default:
        return Tag
    }
  })() as ComponentType<LucideProps>


return (

<div
className="
rounded-[20px]
border
border-[#E7E8E9]
bg-white
p-5
"
>


<div
className="
flex
justify-between
gap-4
"
>


<div>

<h2
className="
text-3xl
font-bold
text-[#00351B]
"
>
Cap
</h2>


<p
className="
text-sm
text-[#666666]
"
>
#4557d20d-210e-499a-b00a-4ee31660eda0
</p>



<div
className="
mt-3
flex
items-center
gap-2
text-sm
text-[#404941]
"
>

<CategoryIconComponent size={15} strokeWidth={1.7} className="text-[var(--dp-green-600)]" />

គ្រឿងតុបតែង

</div>


</div>



<span
  className="
    inline-flex
    items-center
    gap-1.5
    whitespace-nowrap
    h-6
    rounded-full
    bg-[var(--dp-lime-100)]
    border
    border-[var(--dp-lime-400)]
    px-3
    text-xs
    font-semibold
    text-[var(--dp-ok-ink)]
  "
>
  <span
    className="
      w-1.5
      h-1.5
      rounded-full
      bg-[var(--dp-green-500)]
    "
  />

  {t('inStock')}
</span>


</div>




<h2
className="
mt-6
text-3xl
font-bold
text-[#00351B]
"
>
$8.00
</h2>



<p
className="
mt-2
text-sm
text-[#666666]
"
>
{t('addedOn', { date: 'July 29, 2026' })}
</p>


</div>

);

}