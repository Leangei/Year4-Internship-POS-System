import { Menu } from 'lucide-react'
import damreiLogo from '../../assets/header/damreiLogo.svg'
import nearyFashionLogo from '../../assets/header/NearyFashion.svg'

type NavbarProps = {
  userName: string
  onMobileMenuToggle?: () => void
  showMobileMenuButton?: boolean
}

export default function Navbar({ userName, onMobileMenuToggle, showMobileMenuButton }: NavbarProps) {
  return (
    <header
      className="text-white"
      style={{
        borderRadius: 'var(--dp-r-card)',
        background: 'var(--dp-green-900)',
        boxShadow: 'var(--dp-shadow-cta)',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-4 lg:px-6"
        style={{ height: '50px' }}
      >
        {/* Left: Hamburger (mobile only) + Logo + DamreiPOS */}
        <div className="flex items-center gap-2 lg:gap-3">
          {showMobileMenuButton && (
            <button
              type="button"
              onClick={onMobileMenuToggle}
              className="lg:hidden grid place-items-center rounded-[10px] h-9 w-9 text-white hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          )}
          <img src={damreiLogo} alt="DamreiPOS" style={{ height: '28px', width: 'auto' }} />
          <p
            className="font-bold text-white"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--dp-font-latin)',
            }}
          >
            DamreiPOS
          </p>
        </div>

        {/* Right: Store photo only — flush to right edge */}
        <div
          className="flex items-center gap-2 px-3 lg:px-5 py-2 lg:hidden border-l border-white/30"
          style={{
            background: '#BAF912',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            height: '100%',
            marginRight: '-24px',
          }}
        >
          <img
            src={nearyFashionLogo}
            alt={userName}
            className="shrink-0"
            style={{
              height: '28px',
              width: '28px',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          className="hidden lg:flex items-center gap-2 px-3 lg:px-5 py-2"
          style={{
            background: '#BAF912',
            borderTopLeftRadius: '90px',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            height: '100%',
            marginRight: '-24px',
          }}
        >
          <div className="text-right hidden lg:block">
            <p
              className="font-semibold"
              style={{ fontSize: '14px', color: '#00351B' }}
            >
              NearyFashion
            </p>
          </div>
          <img
            src={nearyFashionLogo}
            alt={userName}
            className="shrink-0"
            style={{
              height: '28px',
              width: '28px',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </header>
  )
}