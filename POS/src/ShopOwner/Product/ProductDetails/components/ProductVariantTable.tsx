import { useTranslation } from "react-i18next";

const variants = [
{
size:"XL",
color:"ខ្មៅ",
price:"$8.00",
stock:10,
sold:0
},
{
size:"XL",
color:"ខៀវ",
price:"$8.00",
stock:10,
sold:0
},
{
size:"S",
color:"ខ្មៅ",
price:"$8.00",
stock:10,
sold:0
}
];


export default function ProductVariantTable(){
  const { t } = useTranslation('productDetail')


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


<h2
className="
mb-5
font-semibold
text-lg
"
>
{t('typesAndStock')}
</h2>



<div
className="
overflow-x-auto
"
>

<table
className="
min-w-[700px]
w-full
text-sm
"
>


<thead>

<tr
className="
border-b
bg-[#F3F4F3]
text-left
"
>

<th className="p-4">
{t('size')}
</th>

<th className="p-4">
{t('color')}
</th>



<th className="p-4">
{t('price')}
</th>

<th className="p-4">
{t('stock')}
</th>

<th className="p-4">
{t('sold')}
</th>

<th className="p-4">
{t('status')}
</th>

</tr>

</thead>



<tbody>


{
variants.map((item,index)=>(

<tr
key={index}
className="
border-b
"
>

<td className="p-4">
{item.size}
</td>

<td className="p-4">
{item.color}
</td>


<td className="p-4">
{item.price}
</td>

<td className="p-4">
{item.stock}
</td>

<td className="p-4">
{item.sold}
</td>

<td className="p-4">

<span
className="
rounded-full
bg-[#E8FDBD]
px-3
py-1
text-xs
text-[#134F07]
"
>
{t('inStock')}
</span>

</td>


</tr>

))

}


</tbody>


</table>


</div>



<button
className="
mt-5
w-full
rounded-xl
bg-[#00351B]
py-3
font-semibold
text-white
"
>
{t('add')}
</button>


</div>

);

}