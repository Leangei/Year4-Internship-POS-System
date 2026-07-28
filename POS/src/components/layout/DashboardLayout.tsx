import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import type { SidebarItem } from './Sidebar'

export default function DashboardLayout() {
  const { t } = useTranslation("sidebar")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const sidebarItems: SidebarItem[] = [
    { to: '/shopOwner', label: t('shopOwner.dashboard'), icon: 'Home', end: true },
    { to: '/shopOwner/inbox', label: t('shopOwner.inbox'), icon: 'MessageCircle' },
    { to: '/shopOwner/orders', label: t('shopOwner.orders'), icon: 'ShoppingBag' },
    { to: '/shopOwner/products', label: t('shopOwner.products'), icon: 'Box' },
    { to: '/shopOwner/customers', label: t('shopOwner.customers'), icon: 'Users' },
  ]

  const footerItems: SidebarItem[] = [
    { to: '/shopOwner/plan', label: t('shopOwner.upgradePlan'), icon: 'Gem' },
    { to: '/shopOwner/settings', label: t('shopOwner.accountSettings'), icon: 'Settings' },
  ]

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: 'var(--dp-page)', color: 'var(--dp-body)' }}
    >
      {/* Header – stays at top */}
      <div className="w-[96%] mx-auto pt-4 shrink-0">
        <Navbar
          userName="Neary Fashion"
          onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          showMobileMenuButton
        />
      </div>

      {/* Desktop: Sidebar (left) + content (right) */}
      <div className="hidden lg:flex min-h-0 flex-1 gap-6 w-[96%] mx-auto pb-4 pt-4">
        {/* Sidebar – fixed in place, does NOT scroll */}
        <div className={`${sidebarCollapsed ? 'w-[72px] min-w-[72px]' : 'w-[240px] min-w-[240px]'} shrink-0 self-stretch transition-all duration-300`}>
          <Sidebar
            items={sidebarItems}
            footerItems={footerItems}
            userName="Neary Fashion"
            userRole={t('shopOwner.userRole')}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(prev => !prev)}
          />
        </div>
        {/* Content – ONLY this scrolls */}
        <main
          className="min-h-0 flex-1 overflow-y-auto p-6"
          style={{
            borderRadius: 'var(--dp-r-panel)',
            background: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile: Content only (no bottom nav) */}
      <div className="flex lg:hidden min-h-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-4">
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
          <div className="relative h-full w-[280px] max-w-[85vw] overflow-y-auto bg-white shadow-xl animate-slide-in-left">
            <div className="px-3 pb-4 pt-4">
              <Sidebar
                items={sidebarItems}
                footerItems={footerItems}
                userName="Neary Fashion"
                userRole={t('shopOwner.userRole')}
                collapsed={false}
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}