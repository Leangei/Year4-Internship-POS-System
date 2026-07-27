import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import type { SidebarItem } from './Sidebar'

const sidebarItems: SidebarItem[] = [
  { to: '/shopOwner', label: 'ទំព័រដើម', icon: 'Home' },
  { to: '/shopOwner/inbox', label: 'ប្រអប់សារ', icon: 'MessageCircle' },
  { to: '/shopOwner/orders', label: 'ការកម្មង់', icon: 'ShoppingBag' },
  { to: '/shopOwner/products', label: 'ទំនិញ', icon: 'Box' },
  { to: '/shopOwner/customers', label: 'អតិថិជន', icon: 'Users' },
  
]

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: 'var(--dp-page)', color: 'var(--dp-body)' }}
    >
      {/* Header – stays at top */}
      <div className="w-[96%] mx-auto pt-4 shrink-0">
        <Navbar userName="Neary Fashion" />
      </div>

      {/* Sidebar (left) + content (right) – fill remaining space */}
      <div className="flex min-h-0 flex-1 gap-6 w-[96%] mx-auto pb-4 pt-4">
        {/* Sidebar – fixed in place, does NOT scroll */}
        <div className={`${sidebarCollapsed ? 'w-[72px] min-w-[72px]' : 'w-[240px] min-w-[240px]'} shrink-0 self-stretch transition-all duration-300`}>
          <Sidebar
            items={sidebarItems}
            userName="Neary Fashion"
            userRole="ហាងលក់សម្លៀកបំពាក់"
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(prev => !prev)}
          />
        </div>
        {/* Content – ONLY this scrolls */}
        <main
          className="min-h-0 flex-1 overflow-y-auto p-6"
          style={{
            borderRadius: 'var(--dp-r-panel)',
            background: 'var(--dp-white)',
            boxShadow: 'var(--dp-shadow-card)',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
