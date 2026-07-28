import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BackButton from '../../components/BackButton'
import welcomeImage from '../../assets/login/photoLogin.png'
import logo from '../../assets/welcome/logo.png'

function ResetPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const isFormValid = password.length >= 8 && password === confirmPassword

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid) return
    navigate('/login')
  }

  return (
    <div className="relative min-h-screen bg-slate-100 flex items-center justify-center py-8 overflow-hidden">
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <BackButton to="/otp-verification" className="absolute left-6 top-6 z-10" />

      <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Reset Password" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 px-8 py-10 flex flex-col justify-center gap-6 overflow-hidden">
          <div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("resetPassword.title")}</h2>
            <p className="text-center text-sm text-slate-500 mt-2">
              {t("resetPassword.description")}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("resetPassword.newPasswordLabel")}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t("resetPassword.newPasswordPlaceholder")}
                  className="w-full rounded-xl border border-slate-200 bg-transparent pl-12 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-green-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password.length > 0 && password.length < 8 && (
                <p className="text-xs text-red-500 mt-1">{t("resetPassword.passwordMinLength")}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">{t("resetPassword.confirmPasswordLabel")}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                  className="w-full rounded-xl border border-slate-200 bg-transparent pl-12 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-green-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{t("resetPassword.passwordMismatch")}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-[18px] py-3 text-white font-semibold shadow-md transition bg-green-900 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t("resetPassword.submit")}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;