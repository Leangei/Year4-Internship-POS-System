export default function ProductPage() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
      <div className="mt-4 space-y-4">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="rounded-lg border border-slate-200 p-4">
            <p className="font-medium">Product {i + 1}</p>
            <p className="text-sm text-slate-500">Description for product {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
