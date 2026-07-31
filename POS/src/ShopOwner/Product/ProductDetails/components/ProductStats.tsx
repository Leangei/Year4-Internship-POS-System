import {
  ShoppingBag,
  DollarSign,
  Package
} from "lucide-react";
import { useTranslation } from "react-i18next";


export default function ProductStats(){
  const { t } = useTranslation('productDetail')

  const stats = [
  {
   title: t('totalSold'),
   value:"0",
   icon:ShoppingBag,
   style:"bg-[#00351B] text-white"
  },
  {
   title: t('totalRevenue'),
   value:"$0.00",
   icon:DollarSign,
   style:"bg-[#BAF911] text-[#00351B]"
  },
  {
   title: t('totalInStock'),
   value:"80",
   icon:Package,
   style:"bg-white border border-[#E7E8E9]"
  }

  ];


return (

<div
className="
grid
grid-cols-1
gap-3
sm:gap-4
sm:grid-cols-3
"
>


{
stats.map((item)=>{

const Icon=item.icon;


return (

<div
key={item.title}
className={`
rounded-[16px]
p-5
${item.style}
`}
>


<div
className="
flex
justify-between
"
>

<span
className="
text-sm
"
>
{item.title}
</span>


<Icon size={22}/>


</div>



<h2
className="
mt-5
text-3xl
font-bold
"
>
{item.value}
</h2>


</div>


)

})
}


</div>

);

}