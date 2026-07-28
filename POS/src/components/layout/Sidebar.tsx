import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LogoutModal from '../LogoutModal'
import nearyFashionLogo from '../../assets/header/neary.svg'
import {
  Home,
  Mail,
  ShoppingBag,
  Box,
  Users,
  Settings,
  MessageCircle,
  LogOut,
  Gem,
  X,
  PanelLeftClose,
  PanelRightClose,
  Store,
  ShieldCheck,
  DollarSign,
  ClipboardCheck,
} from 'lucide-react'

type SidebarIcon =
  | 'Home'
  | 'Mail'
  | 'ShoppingBag'
  | 'Box'
  | 'Users'
  | 'Settings'
  | 'MessageCircle'
  | 'Gem'
  | 'Store'
  | 'ShieldCheck'
  | 'DollarSign'
  | 'ClipboardCheck'

type SidebarItem = {
  to: string
  label: string
  icon: SidebarIcon
  badge?: string
  end?: boolean
}

type SidebarProps = {
  userName: string
  userRole?: string
  items: SidebarItem[]
  footerItems?: SidebarItem[]
  collapsed?: boolean
  onToggle?: () => void
  onClose?: () => void
  onLogout?: () => void
}

const iconMap = {
  Home: Home,
  Mail: Mail,
  ShoppingBag: ShoppingBag,
  Box: Box,
  Users: Users,
  MessageCircle: MessageCircle,
  Settings: Settings,
  Gem: Gem,
  Store: Store,
  ShieldCheck: ShieldCheck,
  DollarSign: DollarSign,
  ClipboardCheck: ClipboardCheck,
}

export type { SidebarItem }
export default function Sidebar({ userName, userRole, items, footerItems, collapsed, onToggle, onClose, onLogout }: SidebarProps) {
  const navigate = useNavigate()
  const { t } = useTranslation("sidebar")
  const [showLogout, setShowLogout] = useState(false)
  const defaultFooterItems: SidebarItem[] = [
    { to: '/shopOwner/plan', label: t('shopOwner.upgradePlan'), icon: 'Gem' },
    { to: '/shopOwner/settings', label: t('shopOwner.accountSettings'), icon: 'Settings' },
  ]
  const bottomItems = footerItems ?? defaultFooterItems
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
      return
    }
    navigate('/login')
  }
  return (
    <aside
      className={`flex min-h-full flex-col rounded-[20px] bg-white shadow-[0_60px_120px_rgba(9,30,66,0.08)] transition-all duration-300 ${
        collapsed ? 'w-[72px] p-3' : 'w-full p-4'
      }`}
      style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }}
    >
      {/* Mobile menu header with close button */}
      {onClose && (
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-lg font-semibold text-slate-950">{t('shopOwner.menu')}</span>
          <button
            type="button"
            onClick={onClose}
            className="grid place-items-center rounded-[10px] h-10 w-10 text-slate-950 hover:bg-slate-100 transition shrink-0"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* User section */}
      <div className={`mb-2 flex items-center justify-between ${collapsed ? 'p-1' : 'p-2'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={nearyFashionLogo}
              alt={userName}
              className="shrink-0"
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
            <div className="overflow-hidden">
              <p className="text-xl font-semibold text-slate-950 truncate">{userName}</p>
              {userRole ? <p className="mt-1 text-sm text-slate-600 truncate">{userRole}</p> : null}
            </div>
          </div>
        )}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={`grid place-items-center rounded-[10px] text-slate-950 hover:bg-slate-100 transition ${
              collapsed ? 'h-10 w-full' : 'h-10 w-10'
            }`}
            aria-label={collapsed ? t('shopOwner.expandMenu') : t('shopOwner.collapseMenu')}
            title={collapsed ? t('shopOwner.expandMenu') : t('shopOwner.collapseMenu')}
          >
            {collapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
          </button>
        )}
      </div>

      
      <nav className="flex-1 space-y-2">
        {items.map(item => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/shopOwner'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[10px] text-sm font-medium transition duration-150 ${
                  collapsed ? 'justify-center px-0 py-2.5' : 'px-4 py-2.5'
                } ${
                  isActive ? 'bg-[#BAF912] text-slate-950' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <span className="grid place-items-center text-slate-900" style={{ width: 15, height: 15 }}>
                <Icon size={15} />
              </span>
              {!collapsed && <span>{item.label}</span>}
              {item.badge && !collapsed ? (
                <span className="ml-auto rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white">{item.badge}</span>
              ) : null}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom buttons */}
      {bottomItems.length > 0 && (
        <div className={`mt-10 space-y-2 ${collapsed ? 'flex flex-col items-center' : ''}`}>
          {bottomItems.map(item => {
            const Icon = iconMap[item.icon]
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={`flex items-center gap-3 rounded-[10px] text-sm font-medium text-slate-700 transition hover:bg-slate-100 cursor-pointer ${
                  collapsed ? 'justify-center w-full px-0 py-2.5' : 'w-full px-4 py-2.5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="grid place-items-center" style={{ width: 15, height: 15 }}>
                  <Icon size={15} className="text-[#16a34a]" />
                </span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setShowLogout(true)}
        className={`mt-6 flex items-center gap-3 rounded-[10px] text-sm font-medium text-red-500 transition hover:bg-red-50 cursor-pointer ${
          collapsed ? 'justify-center w-full px-0 py-2.5' : 'w-full px-4 py-2.5'
        }`}
        title={collapsed ? t('shopOwner.logout') : undefined}
      >
        <span className="grid place-items-center" style={{ width: 15, height: 15 }}>
          <LogOut size={15} />
        </span>
        {!collapsed && <span>{t('shopOwner.logout')}</span>}
      </button>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </aside>
  )
}