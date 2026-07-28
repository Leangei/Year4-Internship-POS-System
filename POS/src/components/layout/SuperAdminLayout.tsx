import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import SuperAdminSidebar from './SuperAdminSidebar'

export default function SuperAdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--dp-page)] text-[var(--dp-body)]">
      {/* Desktop sidebar - full height */}
      <div className="hidden lg:block h-screen">
        <div className="h-full">
          <SuperAdminSidebar />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 lg:p-6">
        {/* Mobile top bar with hamburger */}
        <div className="flex lg:hidden items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="grid place-items-center rounded-[10px] h-10 w-10 text-[var(--dp-green-900)] hover:bg-white/20 transition"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span
            className="font-bold text-[var(--dp-green-900)]"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--dp-font-latin)',
            }}
          >
            DamreiPOS
          </span>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto rounded-[var(--dp-r-panel)] bg-[var(--dp-white)] shadow-[var(--dp-shadow-card)] p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile: Off-canvas sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <div className="relative h-full w-[280px] max-w-[85vw] overflow-y-auto bg-[var(--dp-green-900)] shadow-xl animate-slide-in-left">
          <SuperAdminSidebar
            onClose={() => setMobileSidebarOpen(false)}
            onNavigate={() => setMobileSidebarOpen(false)}
          />
          </div>
        </div>
      )}
    </div>
  )
}