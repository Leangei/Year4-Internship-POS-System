import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BackButton from '../../components/BackButton'
import logo from '../../assets/welcome/logo.png'
import welcomeImage from '../../assets/login/photoLogin.png'
import { getShopByPhone } from '../../stores/ShopData'

function WaitingApproval() {
  const navigate = useNavigate()
  const { t } = useTranslation('auth')

  const pendingShop = (() => {
    try {
      const raw = sessionStorage.getItem('posPendingShop')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.phone) return getShopByPhone(parsed.phone)
      }
    } catch {
      // ignore
    }
    return undefined
  })()

  const isApproved = pendingShop?.status === 'approved'
  const isRejected = pendingShop?.status === 'rejected'
  const statusMessage = isApproved
    ? 'Your application has been approved! You can now log in.'
    : isRejected
    ? 'Your application was rejected. Please contact support.'
    : ''

  return (
    <div className="relative min-h-screen bg-slate-100 overflow-hidden lg:flex lg:items-center lg:justify-center">
      {/* Decorative circles */}
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />

      <BackButton to="/login" className="absolute left-6 top-6 z-20" />

      {/* ================= MOBILE WAITING APPROVAL ================= */}
      <div className="relative min-h-screen w-full px-6 flex flex-col justify-center lg:hidden">
        {/* Logo */}
        <div className="flex flex-col items-center mb-2">
          <img src={logo} alt="logo" className="h-12 w-auto" />
          <h1 className="mt-1 text-xl font-bold tracking-[0.3em] text-[#003B14]">DOMREI</h1>
          <p className="text-[10px] tracking-[0.35em] text-[#2E6E24]">POS</p>
        </div>

        {/* Title */}
        <h2 className="text-base text-center font-extrabold text-[#01361C] mb-2">
          {t('waitingApproval.title')}
        </h2>

        {/* Description */}
        <p className="text-center text-[11px] text-slate-500 mb-3 leading-relaxed">
          {t('waitingApproval.description')}
        </p>

        {/* Status message */}
        {statusMessage && (
          <p
            className={`mb-3 text-center text-xs font-semibold ${
              isApproved ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {statusMessage}
          </p>
        )}

        {/* Steps - compact */}
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2 rounded-lg bg-white p-2.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-[10px] font-bold">✔</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{t('waitingApproval.stepOne')}</p>
              <p className="text-[10px] text-slate-500 leading-tight truncate">{t('waitingApproval.stepOneDetail')}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-white p-2.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-[10px] font-bold">2</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{t('waitingApproval.stepTwo')}</p>
              <p className="text-[10px] text-slate-500 leading-tight truncate">{t('waitingApproval.stepTwoDetail')}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400 text-[10px] font-bold">3</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-400 truncate">{t('waitingApproval.stepThree')}</p>
              <p className="text-[10px] text-slate-400 leading-tight truncate">{t('waitingApproval.stepThreeDetail')}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400 text-[10px] font-bold">4</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-400 truncate">{t('waitingApproval.stepFour')}</p>
              <p className="text-[10px] text-slate-400 leading-tight truncate">{t('waitingApproval.stepFourDetail')}</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <p className="text-center text-[10px] text-slate-400 mb-2">
          {t('waitingApproval.supportLine')}
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full rounded-xl py-2 text-xs text-white font-semibold bg-green-900"
        >
          {t('waitingApproval.continueButton')}
        </button>
      </div>

      {/* ================= DESKTOP WAITING APPROVAL ================= */}
      <div className="hidden lg:flex h-[550px] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        {/* Image */}
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Waiting Approval" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        {/* Content */}
        <div className="w-1/2 px-8 py-8 flex flex-col justify-center gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl">⌛</div>
            </div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">
              {t('waitingApproval.title')}
            </h2>
            <p className="text-center text-sm text-slate-500 mt-2 leading-relaxed">
              {t('waitingApproval.description')}
            </p>
            {statusMessage && (
              <p
                className={`mt-2 text-center text-sm font-semibold ${
                  isApproved ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">✔</div>
              <div>
                <p className="text-xs font-semibold text-slate-900">{t('waitingApproval.stepOne')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('waitingApproval.stepOneDetail')}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold">2</div>
              <div>
                <p className="text-xs font-semibold text-slate-900">{t('waitingApproval.stepTwo')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('waitingApproval.stepTwoDetail')}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400 text-xs font-bold">3</div>
              <div>
                <p className="text-xs font-semibold text-slate-400">{t('waitingApproval.stepThree')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('waitingApproval.stepThreeDetail')}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400 text-xs font-bold">4</div>
              <div>
                <p className="text-xs font-semibold text-slate-400">{t('waitingApproval.stepFour')}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t('waitingApproval.stepFourDetail')}</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400">
            {t('waitingApproval.supportLine')}
          </p>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full rounded-xl py-2.5 text-white font-semibold shadow-md bg-green-900 hover:bg-green-800 transition"
          >
            {t('waitingApproval.continueButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WaitingApproval