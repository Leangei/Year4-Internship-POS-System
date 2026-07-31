import ProductCard from './ProductCard'
import type { ProductItem } from './ProductTypes'

export default function ProductList({ products }: { products: ProductItem[] }) {
  return (
    <div className="flex flex-col gap-[10px] mt-0 lg:mt-5">
      {products.length === 0 ? (
        <div className="bg-white rounded-[var(--dp-r-card)] shadow-[var(--dp-shadow-card)] p-8 text-center text-sm text-[var(--dp-muted)]">
          No products found.
        </div>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  )
}