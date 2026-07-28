import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Phone, User, Calendar } from 'lucide-react'
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import lockIcon from "../../assets/login/lock.svg"
import googleIcon from "../../assets/login/google.svg"
import welcomeImage from "../../assets/login/photoLogin.png"
import logo from "../../assets/welcome/logo.png"
import BackButton from '../../components/BackButton'

function Register() {
  const { t } = useTranslation("auth")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const isFormValid =
    name.trim() !== '' &&
    gender.trim() !== '' &&
    phone.trim() !== '' &&
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    agreeTerms

  return (
    <div className="relative h-screen bg-slate-100 flex items-center justify-center overflow-hidden">
      {/* Top-right half circle */}
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      {/* Bottom-left half circle */}
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <BackButton to="/login" className="absolute left-6 top-6 z-10" />

      <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Register" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <div className="w-1/2 px-8 py-6 flex flex-col justify-center gap-3 overflow-y-auto">
          <div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("register.title")}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("register.nameLabel")}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder={t("register.namePlaceholder")} value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("register.genderLabel")}</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder={t("register.genderPlaceholder")} value={gender} onChange={e => setGender(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.phoneLabel")}</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder={t("register.phonePlaceholder")} value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.passwordLabel")}</label>
            <div className="relative">
              <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
              <input type={showPassword ? 'text' : 'password'} placeholder={t("register.passwordPlaceholder")} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-12 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">{t("register.confirmPasswordLabel")}</label>
            <div className="relative">
              <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
              <input type={showConfirm ? 'text' : 'password'} placeholder={t("register.confirmPasswordPlaceholder")} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-12 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
              <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
            <span>{t("register.agreeTerms")}</span>
          </label>

          <button disabled={!isFormValid} className={`w-full rounded-xl py-2.5 text-white font-semibold shadow-md transition ${isFormValid ? 'bg-green-900 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}>{t("register.registerButton")}</button>

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