import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BackButton from '../../components/BackButton'
import welcomeImage from '../../assets/login/photoLogin.png'
import logo from '../../assets/welcome/logo.png'

const OTP_LENGTH = 6

function OtpVerification() {
  const navigate = useNavigate()
  const { t } = useTranslation("auth")
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const nextCode = [...code]
    nextCode[index] = value
    setCode(nextCode)

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const isComplete = code.every(digit => digit !== '')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isComplete) return
    navigate('/reset-password')
  }

  return (
    <div className="relative min-h-screen bg-slate-100 flex items-center justify-center py-8 overflow-hidden">
      <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
      <BackButton to="/forgot-password" className="absolute left-6 top-6 z-10" />

      <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="OTP Verification" className="h-full w-full object-cover" />
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 px-8 py-10 flex flex-col justify-center gap-6 overflow-hidden">
          <div>
            <h2 className="text-2xl text-center font-extrabold text-[#01361C]">{t("otpVerification.title")}</h2>
            <p className="text-center text-sm text-slate-500 mt-2">
              {t("otpVerification.description")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement | null) => { inputsRef.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 focus:border-green-900 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isComplete}
            className={`w-full rounded-[18px] py-3 text-white font-semibold shadow-md transition ${isComplete ? 'bg-green-900 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {t("otpVerification.submit")}
          </button>

          <p className="text-center text-sm text-slate-500">
            {t("otpVerification.noCode")} <button type="button" className="font-semibold text-green-900">{t("otpVerification.resend")}</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default OtpVerification;