import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Grid, ClipboardList, Users, Layout, Settings, LogOut, Banknote, X } from 'lucide-react'
import damreiLogo from '../../assets/header/damreiLogo.svg'
import LogoutModal from '../LogoutModal'

type SuperAdminSidebarProps = {
  onClose?: () => void
  onNavigate?: () => void
}

export default function SuperAdminSidebar({ onClose, onNavigate }: SuperAdminSidebarProps) {
  const navigate = useNavigate()
  const { t } = useTranslation("sidebar")
  const [showLogout, setShowLogout] = useState(false)

  const navItems = [
    { to: '/superadmin', label: t('superAdmin.dashboard'), Icon: Grid },
    { to: '/superadmin/approval', label: t('superAdmin.approval'), Icon: ClipboardList },
    { to: '/superadmin/shop', label: t('superAdmin.shop'), Icon: Users },
    { to: '/superadmin/plan', label: t('superAdmin.plan'), Icon: Layout },
    { to: '/superadmin/payment', label: t('superAdmin.payment'), Icon: Banknote },
    { to: '/superadmin/setting', label: t('superAdmin.settings'), Icon: Settings },
  ]

  return (
    <aside className="w-[276px] min-w-[276px] flex flex-col gap-6 px-5 py-6 bg-[var(--dp-green-900)] text-[var(--dp-white)] h-full" style={{ fontFamily: "'Noto Sans Khmer', sans-serif", fontSize: '14px' }}>
      {/* Mobile menu header with close button */}
      {onClose && (
        <div className="flex items-center justify-between lg:hidden">
          <span className="text-lg font-semibold text-white">{t('shopOwner.menu')}</span>
          <button
            type="button"
            onClick={onClose}
            className="grid place-items-center rounded-[10px] h-10 w-10 text-white hover:bg-white/10 transition shrink-0"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Logo + Brand */}
      <div className="flex items-center gap-4">
        <img src={damreiLogo} alt="DamreiPOS" style={{ height: '44px', width: '44px', borderRadius: '16px' }} />
        <div className="flex flex-col gap-[2px]">
          <span
            className="font-bold text-white"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--dp-font-latin)',
            }}
          >
            DamreiPOS
          </span>
          <span className="text-sm text-[var(--dp-lime-100)]">{t('superAdmin.console')}</span>
        </div>
      </div>

      {/* Navigation - items align with brand text */}
      <nav className="flex flex-col gap-1" aria-label="SuperAdmin navigation">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/superadmin'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-[var(--dp-lime-500)] text-[var(--dp-green-950)]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="shrink-0" size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Account info */}
        <div className="flex flex-col gap-2 rounded-[14px] bg-white/10 px-4 py-3">
          <span className="text-xs text-[var(--dp-lime-100)]">{t('superAdmin.accountAs')}</span>
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--dp-lime-500)] text-[var(--dp-green-950)] font-bold text-sm"
              title="Super Admin"
            >
              SA
            </span>
            <div className="min-w-0">
              <div className="font-semibold truncate">Super Admin</div>
              <div className="text-xs text-[var(--dp-lime-100)] truncate">superadmin@damreipos.com</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white cursor-pointer"
          onClick={() => setShowLogout(true)}
        >
          <LogOut className="shrink-0" size={20} />
          <span>{t('superAdmin.logout')}</span>
        </button>

        {showLogout && (
          <LogoutModal
            onConfirm={() => navigate('/login')}
            onCancel={() => setShowLogout(false)}
          />
        )}
      </div>
    </aside>
  )
}