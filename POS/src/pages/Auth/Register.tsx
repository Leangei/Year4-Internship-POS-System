import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Mail, Phone, User, Store } from 'lucide-react'
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import lockIcon from "../../assets/login/lock.svg"
import googleIcon from "../../assets/login/google.svg"
import welcomeImage from "../../assets/login/photoLogin.png"
import logo from "../../assets/welcome/logo.png"
import BackButton from '../../components/BackButton'
import { registerShop } from '../../stores/ShopData'

function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [shopName, setShopName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const isFormValid =
    shopName.trim() !== '' &&
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    agreeTerms

  const handleRegister = () => {
    if (!isFormValid) return
    setError('')
    try {
      registerShop(shopName, name, email, phone, password)
      sessionStorage.setItem('posPendingShop', JSON.stringify({ name, phone }))
      navigate('/waiting-approval')
    } catch {
      setError('Failed to create account. Please try again.')
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-100 overflow-hidden lg:flex lg:items-center lg:justify-center">
      {/* Top-right & Bottom-left circles */}
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />

      {/* ================= MOBILE REGISTER ================= */}
      <div className="relative min-h-screen w-full px-6 py-16 flex flex-col justify-center lg:hidden overflow-y-auto">
        <BackButton to="/login" className="absolute left-6 top-6 z-10" />

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="logo" className="h-14 w-auto" />
          <h1 className="mt-1 text-2xl font-bold tracking-[0.3em] text-[#003B14]">DOMREI</h1>
          <p className="text-xs tracking-[0.35em] text-[#2E6E24]">POS</p>
        </div>

        {/* Title */}
        <h2 className="text-lg text-center font-extrabold text-[#01361C] mb-5">{t("register.title")}</h2>

        {/* Shop Name */}
        <label className="text-xs text-gray-600 mb-1">{t("register.shopNameLabel")}</label>
        <div className="relative mb-3">
          <Store size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            autoComplete="off"
            placeholder={t("register.shopNamePlaceholder")}
            value={shopName}
            onChange={e => setShopName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Name (Owner) */}
        <label className="text-xs text-gray-600 mb-1">{t("register.nameLabel")}</label>
        <div className="relative mb-3">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            autoComplete="off"
            placeholder={t("register.namePlaceholder")}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Email */}
        <label className="text-xs text-gray-600 mb-1">{t("register.emailLabel")}</label>
        <div className="relative mb-3">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            autoComplete="off"
            placeholder={t("register.emailPlaceholder")}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Phone */}
        <label className="text-xs text-gray-600 mb-1">{t("register.phoneLabel")}</label>
        <div className="relative mb-3">
          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            autoComplete="off"
            placeholder={t("register.phonePlaceholder")}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Password */}
        <label className="text-xs text-gray-600 mb-1">{t("register.passwordLabel")}</label>
        <div className="relative mb-3">
          <img src={lockIcon} className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 opacity-50" />
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("register.passwordPlaceholder")}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="text-xs text-gray-600 mb-1">{t("register.confirmPasswordLabel")}</label>
        <div className="relative mb-3">
          <img src={lockIcon} className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 opacity-50" />
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("register.confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 text-xs text-gray-600 mb-4">
          <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="mt-0.5 h-3.5 w-3.5" />
          <span>{t("register.agreeTerms")}</span>
        </label>

        {/* Error */}
        {error && (
          <p className="mb-3 text-center text-xs text-red-600">{error}</p>
        )}

        {/* Register Button */}
        <button
          type="button"
          onClick={handleRegister}
          disabled={!isFormValid}
          className={`w-full rounded-xl py-3 text-sm text-white font-semibold ${isFormValid ? "bg-green-900" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {t("register.registerButton")}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{t("register.orLoginWith")}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4">
          <button className="h-9 w-9 rounded-full border flex items-center justify-center">
            <img src={googleIcon} className="w-4" />
          </button>
          <button className="h-9 w-9 rounded-full border flex items-center justify-center">
            <FaFacebook className="text-blue-600 text-base" />
          </button>
          <button className="h-9 w-9 rounded-full border flex items-center justify-center">
            <FaTelegram className="text-blue-400 text-base" />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP REGISTER ================= */}
      <div className="hidden lg:flex mx-auto h-[620px] w-full max-w-[900px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <BackButton to="/login" className="absolute left-6 top-6 z-10" />

        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Register" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <div className="w-1/2 px-8 py-8 flex flex-col justify-center gap-3 overflow-y-auto">
          <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("register.title")}</h2>

          {/* Shop Name + Owner Name in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("register.shopNameLabel")}</label>
              <div className="relative">
                <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" autoComplete="off" placeholder={t("register.shopNamePlaceholder")} value={shopName} onChange={e => setShopName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("register.nameLabel")}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" autoComplete="off" placeholder={t("register.namePlaceholder")} value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.emailLabel")}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" autoComplete="off" placeholder={t("register.emailPlaceholder")} value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.phoneLabel")}</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" autoComplete="off" placeholder={t("register.phonePlaceholder")} value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.passwordLabel")}</label>
            <div className="relative">
              <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
              <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder={t("register.passwordPlaceholder")} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (below Password) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.confirmPasswordLabel")}</label>
            <div className="relative">
              <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
              <input type={showConfirm ? 'text' : 'password'} autoComplete="new-password" placeholder={t("register.confirmPasswordPlaceholder")} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300" />
              <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
            <span>{t("register.agreeTerms")}</span>
          </label>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <button
            type="button"
            onClick={handleRegister}
            disabled={!isFormValid}
            className={`w-full rounded-xl py-2.5 text-white font-semibold shadow-md transition ${isFormValid ? 'bg-green-900 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {t("register.registerButton")}
          </button>

          <div className="text-center text-sm text-slate-500">{t("register.orLoginWith")}</div>

          <div className="flex gap-2 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent py-2 text-sm hover:bg-slate-50 transition">
              <img src={googleIcon} alt="" className="w-4 h-4" />
              <span className="text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent py-2 text-sm hover:bg-slate-50 transition">
              <FaFacebook className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Facebook</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent py-2 text-sm hover:bg-slate-50 transition">
              <FaTelegram className="w-4 h-4 text-blue-400" />
              <span className="text-gray-700">Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register