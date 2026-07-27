import damreiLogo from '../../assets/header/damreiLogo.svg'
import nearyFashionLogo from '../../assets/header/NearyFashion.svg'

type NavbarProps = {
  userName: string
}

export default function Navbar({ userName }: NavbarProps) {
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
        className="mx-auto flex items-center justify-between px-6"
        style={{ height: '50px' }}
      >
        {/* Left: Logo + DamreiPOS */}
        <div className="flex items-center gap-3">
          <img src={damreiLogo} alt="DamreiPOS" style={{ height: '32px', width: 'auto' }} />
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

        {/* Right: Store name + photo — flush to right edge */}
        <div
          className="flex items-center gap-3 px-5 py-2"
          style={{
            width: '254px',
            background: '#BAF912',
            borderTopLeftRadius: '90px',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            height: '100%',
            marginRight: '-24px',
          }}
        >
          <div className="flex-1 text-right leading-tight">
            <p
              className="font-semibold"
              style={{ fontSize: '16px', color: '#00351B' }}
            >
              {userName}
            </p>
          </div>
          <img
            src={nearyFashionLogo}
            alt={userName}
            style={{
              height: '30px',
              width: '30px',
              borderRadius: '5px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </header>
  )
}