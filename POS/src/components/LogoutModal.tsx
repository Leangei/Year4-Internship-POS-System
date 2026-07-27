function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-[90%] max-w-[380px] rounded-[20px] bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-center text-xl font-semibold text-slate-950">ចាកចេញពីគណនី</h3>
        <p className="mt-3 text-center text-sm text-slate-600">តើអ្នកពិតជាចង់ចាកចេញពីគណនីមែនទេ?</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-[10px] border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            បោះបង់
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-[10px] bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            ចាកចេញ
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal