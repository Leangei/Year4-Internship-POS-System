import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, MessageCircle, ShoppingBag, Box, Users } from 'lucide-react'

const navItems = [
  { to: '/shopOwner', labelKey: 'shopOwner.dashboard', icon: Home, end: true },
  { to: '/shopOwner/inbox', labelKey: 'shopOwner.inbox', icon: MessageCircle },
  { to: '/shopOwner/orders', labelKey: 'shopOwner.orders', icon: ShoppingBag },
  { to: '/shopOwner/products', labelKey: 'shopOwner.products', icon: Box },
  { to: '/shopOwner/customers', labelKey: 'shopOwner.customers', icon: Users },
]

export default function BottomNavigation() {
  const { t } = useTranslation("sidebar")

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-slate-200 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden">
      {navItems.map(({ to, labelKey, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors duration-150 ${
              isActive
                ? 'text-[#1E6C1D]'
                : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={20} className={isActive ? 'text-[#1E6C1D]' : 'text-slate-400'} />
              <span>{t(labelKey)}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}