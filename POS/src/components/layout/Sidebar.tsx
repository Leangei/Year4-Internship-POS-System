import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogoutModal from '../LogoutModal'
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
export default function Sidebar({ userName, userRole, items, footerItems, collapsed, onToggle, onLogout }: SidebarProps) {
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)
  const defaultFooterItems: SidebarItem[] = [
    { to: '/shopOwner/plan', label: 'អាប់ក្រេតគម្រោង', icon: 'Gem' },
    { to: '/shopOwner/settings', label: 'កំណត់គណនី', icon: 'Settings' },
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
      {/* User section */}
      <div className={`mb-2 flex items-center justify-between ${collapsed ? 'p-1' : 'p-2'}`}>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-xl font-semibold text-slate-950 truncate">{userName}</p>
            {userRole ? <p className="mt-1 text-sm text-slate-600 truncate">{userRole}</p> : null}
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className={`grid place-items-center rounded-[10px] text-slate-950 hover:bg-slate-100 transition ${
            collapsed ? 'h-10 w-full' : 'h-10 w-10'
          }`}
          aria-label={collapsed ? 'ពង្រីកម៉ឺនុយ' : 'បង្រួមម៉ឺនុយ'}
          title={collapsed ? 'ពង្រីកម៉ឺនុយ' : 'បង្រួមម៉ឺនុយ'}
        >
          {collapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
        </button>
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
        title={collapsed ? 'ចាកចេញ' : undefined}
      >
        <span className="grid place-items-center" style={{ width: 15, height: 15 }}>
          <LogOut size={15} />
        </span>
        {!collapsed && <span>ចាកចេញ</span>}
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