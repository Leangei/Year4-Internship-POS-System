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
  <div className="relative min-h-screen bg-slate-100 overflow-hidden lg:flex lg:items-center lg:justify-center">

    {/* Decorative circles */}
    <div className="absolute -top-40 -right-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />
    <div className="absolute -bottom-40 -left-30 h-64 w-64 rounded-full bg-[#1E6C1D]" />

    <BackButton
      to="/otp-verification"
      className="absolute left-6 top-6 z-20"
    />


    {/* ================= MOBILE RESET PASSWORD ================= */}
    <form
      onSubmit={handleSubmit}
      className="
      relative min-h-screen
      w-full
      px-6
      py-20
      flex flex-col
      justify-center
      lg:hidden
      overflow-y-auto
      "
    >

      {/* Logo */}
      <div className="flex flex-col items-center mb-10">

        <img
          src={logo}
          alt="logo"
          className="h-20 w-auto"
        />

        <h1
          className="
          mt-2
          text-3xl
          font-bold
          tracking-[0.3em]
          text-[#003B14]
          "
        >
          DOMREI
        </h1>

        <p
          className="
          text-sm
          tracking-[0.35em]
          text-[#2E6E24]
          "
        >
          POS
        </p>

      </div>



      {/* Title */}
      <h2
        className="
        text-xl
        text-center
        font-extrabold
        text-[#01361C]
        "
      >
        {t("resetPassword.title")}
      </h2>


      <p
        className="
        text-center
        text-sm
        text-slate-500
        mt-3
        mb-8
        "
      >
        {t("resetPassword.description")}
      </p>



      {/* New Password */}
      <label className="text-sm text-gray-600 mb-1">
        {t("resetPassword.newPasswordLabel")}
      </label>

      <div className="relative mb-4">

        <Lock
          size={17}
          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder={t("resetPassword.newPasswordPlaceholder")}
          className="
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          pl-10
          pr-12
          focus:outline-none
          focus:ring-2
          focus:ring-green-300
          "
        />


        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        >
          {
            showPassword
            ?
            <EyeOff size={18}/>
            :
            <Eye size={18}/>
          }

        </button>

      </div>


      {
        password.length > 0 &&
        password.length < 8 &&
        (
          <p className="text-xs text-red-500 mb-3">
            {t("resetPassword.passwordMinLength")}
          </p>
        )
      }



      {/* Confirm Password */}
      <label className="text-sm text-gray-600 mb-1">
        {t("resetPassword.confirmPasswordLabel")}
      </label>


      <div className="relative mb-6">

        <Lock
          size={17}
          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />


        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder={t("resetPassword.confirmPasswordPlaceholder")}
          className="
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          pl-10
          pr-12
          focus:outline-none
          focus:ring-2
          focus:ring-green-300
          "
        />


        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        >

          {
            showConfirm
            ?
            <EyeOff size={18}/>
            :
            <Eye size={18}/>
          }

        </button>

      </div>


      {
        confirmPassword.length > 0 &&
        password !== confirmPassword &&
        (
          <p className="text-xs text-red-500 mb-3">
            {t("resetPassword.passwordMismatch")}
          </p>
        )
      }



      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`
        w-full
        rounded-xl
        py-3
        text-white
        font-semibold

        ${
          isFormValid
          ?
          "bg-green-900"
          :
          "bg-gray-400 cursor-not-allowed"
        }
        `}
      >

        {t("resetPassword.submit")}

      </button>


    </form>




    {/* ================= DESKTOP RESET PASSWORD ================= */}
    <div
      className="
      hidden
      lg:flex
      h-[550px]
      w-full
      max-w-[850px]
      overflow-hidden
      rounded-[28px]
      bg-white
      shadow-[0_30px_60px_rgba(2,6,23,0.08)]
      "
    >


      {/* Image */}
      <div className="w-1/2 relative bg-slate-200">

        <img
          src={welcomeImage}
          alt="Reset Password"
          className="h-full w-full object-cover"
        />


        <div
          className="
          absolute
          top-[40px]
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-1
          "
        >

          <img
            src={logo}
            alt="logo"
            className="h-14 w-auto"
          />


          <h3
            className="
            text-xl
            font-bold
            text-green-900
            tracking-[0.28em]
            "
          >
            DOMREI
          </h3>


          <span
            className="
            text-xs
            text-green-800
            tracking-widest
            "
          >
            - POS -
          </span>

        </div>

      </div>



      {/* Desktop Form */}
      <form
        onSubmit={handleSubmit}
        className="
        w-1/2
        px-8
        py-10
        flex
        flex-col
        justify-center
        gap-6
        "
      >

        {/* Keep your existing desktop form here */}
        
      </form>


    </div>

  </div>
)
}

export default ResetPassword;