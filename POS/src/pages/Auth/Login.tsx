import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Eye, EyeOff } from 'lucide-react'
import lockIcon from "../../assets/login/lock.svg"
import googleIcon from "../../assets/login/google.svg"
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import BackButton from '../../components/BackButton'
import welcomeImage from "../../assets/login/photoLogin.png"
import logo from "../../assets/welcome/logo.png"

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const isFormValid =
    phone.trim() !== '' &&
    password.length >= 8

  return (
    <div className="
relative
min-h-screen
bg-slate-100
overflow-hidden
lg:flex
lg:items-center
lg:justify-center
">
      {/* Decorative circles */}
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />

      <BackButton to="/" className="absolute left-6 top-6 z-20" />

      {/* ================= MOBILE LOGIN ================= */}
<div className="
relative
w-full
min-h-screen
px-6
pt-24
pb-10
flex
flex-col
justify-start
lg:hidden
overflow-y-auto
">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="h-16 w-auto" />
          <h1 className="mt-2 text-3xl font-bold tracking-[0.3em] text-[#003B14]">DOMREI</h1>
          <p className="text-sm tracking-[0.35em] text-[#2E6E24]">POS</p>
        </div>

        {/* Title */}
        <h2 className="text-xl text-center font-extrabold text-[#01361C] mb-5">{t("login.title")}</h2>

        {/* Phone */}
        <label className="text-sm text-gray-600 mb-1">{t("login.phoneLabel")}</label>
        <div className="relative mb-4">
          <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("login.phonePlaceholder")}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Password */}
        <label className="text-sm text-gray-600 mb-1">{t("login.passwordLabel")}</label>
        <div className="relative">
          <img src={lockIcon} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 opacity-50" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mt-3 mb-6">
          <Link to="/forgot-password" className="text-sm text-red-500">{t("login.forgotPassword")}</Link>
        </div>

        {/* Login Button */}
        <button
          disabled={!isFormValid}
          onClick={() => navigate('/shopOwner')}
          className={`w-full rounded-xl py-3 text-white font-semibold ${isFormValid ? "bg-green-900" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {t("login.loginButton")}
        </button>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-5">
          {t("login.noAccount")}
          <Link to="/register" className="text-green-900 font-semibold ml-1">{t("login.createAccount")}</Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">{t("login.orLoginWith")}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-5">
          <button className="h-11 w-11 rounded-full border flex items-center justify-center">
            <img src={googleIcon} className="w-5" />
          </button>
          <button className="h-11 w-11 rounded-full border flex items-center justify-center">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button className="h-11 w-11 rounded-full border flex items-center justify-center">
            <FaTelegram className="text-blue-400 text-xl" />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP LOGIN ================= */}
      <div className="hidden lg:flex h-[550px] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        {/* Left image panel */}
        <div className="w-1/2 relative bg-slate-200 min-h-[550px]">
          <img src={welcomeImage} alt="Welcome" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-1/2 px-8 py-8 flex flex-col justify-center gap-3">
          <h2 className="text-xl text-center font-extrabold text-[#01361C]">{t("login.title")}</h2>

          <label className="block text-sm text-gray-600">{t("login.phoneLabel")}</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder={t("login.phonePlaceholder")} value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
          </div>

          <label className="block text-sm text-gray-600">{t("login.passwordLabel")}</label>
          <div className="relative">
            <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
            <input type={showPassword ? 'text' : 'password'} placeholder={t("login.passwordPlaceholder")} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-12 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-600"><input type="checkbox" className="h-4 w-4" /> {t("login.rememberMe")}</label>
            <Link to="/forgot-password" className="text-sm text-red-500">{t("login.forgotPassword")}</Link>
          </div>

          <button disabled={!isFormValid} onClick={() => navigate('/shopOwner')} className={`w-full rounded-xl py-2.5 text-white font-semibold shadow-md transition ${isFormValid ? 'bg-green-900 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}>{t("login.loginButton")}</button>

          <div className="text-center text-sm text-slate-500 mt-3">{t("login.orLoginWith")}</div>

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

          <p className="text-center text-sm text-slate-500 mt-4">{t("login.noAccount")} <Link to="/register" className="text-green-900 font-semibold">{t("login.createAccount")}</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login