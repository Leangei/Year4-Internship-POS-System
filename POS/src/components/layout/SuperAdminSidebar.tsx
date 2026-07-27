import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Grid, ClipboardList, Users, Layout, Settings, LogOut, Banknote } from 'lucide-react'
import damreiLogo from '../../assets/header/damreiLogo.svg'
import LogoutModal from '../LogoutModal'

const navItems = [
  { to: '/superadmin', label: 'ទិដ្ឋភាពទូទៅ', Icon: Grid },
  { to: '/superadmin/approval', label: 'សំណើរចុះឈ្មោះ', Icon: ClipboardList },
  { to: '/superadmin/shop', label: 'អតិថិជន', Icon: Users },
  { to: '/superadmin/plan', label: 'គម្រោង', Icon: Layout },
  { to: '/superadmin/payment', label: 'ការទូទាត់', Icon: Banknote },
  { to: '/superadmin/setting', label: 'ការកំណត់', Icon: Settings },
]

export default function SuperAdminSidebar() {
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <aside className="w-[276px] min-w-[276px] h-screen flex flex-col gap-6 px-4 py-6 bg-[var(--dp-green-900)] text-[var(--dp-white)]" style={{ fontFamily: "'Noto Sans Khmer', sans-serif", fontSize: '14px' }}>
      <div className="flex items-center gap-4">
        <img src={damreiLogo} alt="DamreiPOS" style={{ height: '44px', width: '44px', borderRadius: '16px' }} />
        <div className="flex flex-col gap-[2px]">
          <span className="text-base font-bold">DamreiPOS</span>
          <span className="text-sm text-[var(--dp-lime-100)]">កុងសុលអ្នកគ្រប់គ្រង</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2" aria-label="SuperAdmin navigation">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/superadmin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-[var(--dp-lime-500)] text-[var(--dp-green-950)]'
                  : 'text-white hover:bg-white/10'
              }`
            }
          >
            <Icon className="text-current" size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-5">
        <div className="flex flex-col gap-2 rounded-[14px] bg-white/10 px-4 py-3">
          <span className="text-xs text-[var(--dp-lime-100)]">គណនីជា</span>
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-[var(--dp-lime-500)] text-[var(--dp-green-950)] font-bold"
              title="Super Admin"
            >
              SA
            </span>
            <div>
              <div className="font-bold">Super Admin</div>
              <div className="text-xs text-[var(--dp-lime-100)]">superadmin@damreipos.com</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-[14px] px-4 py-3 text-sm text-white transition hover:bg-white/10"
          onClick={() => setShowLogout(true)}
        >
          <LogOut className="text-current" size={20} />
          <span>ចាកចេញ</span>
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
