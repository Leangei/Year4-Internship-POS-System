import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import BackButton from '../../components/BackButton'
import welcomeImage from '../../assets/login/photoLogin.png'
import logo from '../../assets/welcome/logo.png'

function ForgotPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [phone, setPhone] = useState('')
  const isFormValid = phone.trim() !== ''

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid) return
    navigate('/otp-verification')
  }

  return (
    <div className="relative min-h-screen bg-slate-100 flex items-center justify-center py-8 overflow-hidden">
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <BackButton to="/login" className="absolute left-6 top-6 z-10" />

      <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Forgot Password" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 px-8 py-8 flex flex-col justify-center gap-4 overflow-hidden">
          <div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("forgotPassword.title")}</h2>
            <p className="text-center text-sm text-slate-500 mt-2">
              {t("forgotPassword.description")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">{t("forgotPassword.phoneLabel")}</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("forgotPassword.phonePlaceholder")}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full rounded-xl py-3 text-white font-semibold shadow-md transition ${isFormValid ? 'bg-green-900 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {t("forgotPassword.sendCode")}
          </button>

          
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;