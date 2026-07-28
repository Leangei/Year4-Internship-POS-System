import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BackButton from '../../components/BackButton'
import welcomeImage from '../../assets/login/photoLogin.png'
import logo from '../../assets/welcome/logo.png'

const OTP_LENGTH = 6

function OtpVerification() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [code, setCode] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isComplete = code.length === OTP_LENGTH

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH)
    setCode(digits)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (code.length !== OTP_LENGTH) return
    navigate('/reset-password')
  }

  return (
    <div className="relative min-h-screen bg-slate-100 overflow-hidden lg:flex lg:items-center lg:justify-center">
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <BackButton to="/forgot-password" className="absolute left-6 top-6 z-20" />

      {/* ================= MOBILE OTP ================= */}
      <form
        onSubmit={handleSubmit}
        className="relative min-h-screen w-full px-6 pt-20 pb-10 flex flex-col justify-start lg:hidden overflow-y-auto"
      >
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="logo" className="h-20 w-auto" />
          <h1 className="mt-2 text-3xl font-bold tracking-[0.3em] text-[#003B14]">DOMREI</h1>
          <p className="text-sm tracking-[0.35em] text-[#2E6E24]">POS</p>
        </div>

        <h2 className="text-xl text-center font-extrabold text-[#01361C]">{t("otpVerification.title")}</h2>
        <p className="text-center text-sm text-slate-500 mt-3 mb-8">{t("otpVerification.description")}</p>

        <div className="mb-8 flex justify-center">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={OTP_LENGTH}
            value={code}
            onChange={handleChange}
            className="w-[280px] h-14 rounded-xl border-2 border-slate-200 bg-white text-center text-2xl font-bold tracking-[1.2em] focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            autoFocus
            placeholder="000000"
          />
        </div>

        <button
          type="submit"
          disabled={!isComplete}
          className={`w-full rounded-xl py-3 text-white font-semibold ${
            isComplete ? "bg-green-900" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {t("otpVerification.submit")}
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          {t("otpVerification.noCode")}
          <button type="button" className="ml-1 font-semibold text-green-900">{t("otpVerification.resend")}</button>
        </p>
      </form>

      {/* ================= DESKTOP OTP ================= */}
      <div className="hidden lg:flex h-[550px] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="OTP Verification" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 px-8 py-10 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("otpVerification.title")}</h2>
            <p className="text-center text-sm text-slate-500 mt-2">{t("otpVerification.description")}</p>
          </div>

          <div className="flex justify-center gap-4">
            {Array(OTP_LENGTH).fill('').map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                data-index={index}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '')
                  if (!v) return
                  const next = document.querySelector<HTMLInputElement>(`[data-index="${index + 1}"]`)
                  next?.focus()
                }}
                onKeyDown={e => {
                  const input = e.target as HTMLInputElement
                  if (e.key === 'Backspace' && !input.value && index > 0) {
                    const prev = document.querySelector<HTMLInputElement>(`[data-index="${index - 1}"]`)
                    prev?.focus()
                  }
                }}
                onFocus={e => e.target.select()}
                className="h-12 w-12 rounded-2xl border-2 border-slate-200 bg-slate-50 text-center text-lg font-semibold focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full rounded-[18px] py-3 text-white font-semibold bg-green-900 hover:bg-green-800"
          >
            {t("otpVerification.submit")}
          </button>

          <p className="text-center text-sm text-slate-500">
            {t("otpVerification.noCode")}
            <button type="button" className="font-semibold text-green-900 ml-1">{t("otpVerification.resend")}</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default OtpVerification