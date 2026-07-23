import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Eye, EyeOff } from 'lucide-react'
import lockIcon from "../../assets/login/lock.svg"
import googleIcon from "../../assets/login/google.svg"
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import welcomeImage from "../../assets/login/photoLogin.png"
import logo from "../../assets/welcome/logo.png"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-8">
      <div className="mx-auto flex w-[100%] max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_rgba(2,6,23,0.08)]">

        {/* Left image panel */}
        <div className="w-1/2 relative bg-slate-200">
          <img src={welcomeImage} alt="Welcome" className="h-full w-full object-cover" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <h3 className="text-xl font-bold text-green-900 tracking-[0.28em]">DOMREI</h3>
            <span className="text-xs text-green-800 tracking-widest">- POS -</span>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-1/2 px-8 py-8 flex flex-col justify-center gap-3">
          <h2 className="text-xl text-center font-extrabold text-[#01361C]">ចូលគណនី</h2>

          <label className="block text-sm text-gray-600">លេខទូរស័ព្ទ</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="+855XXXXXXXX" className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
          </div>

          <label className="block text-sm text-gray-600">ពាក្យសម្ងាត់</label>
          <div className="relative">
            <img src={lockIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-auto opacity-50" />
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-12 py-2 focus:outline-none focus:ring-1 focus:ring-green-300" />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-600"><input type="checkbox" className="h-4 w-4" /> ចងចាំខ្ញុំ</label>
            <a href="#" className="text-sm text-red-500">ភ្លេចពាក្យសម្ងាត់?</a>
          </div>

          <button className="w-full rounded-xl bg-green-900 py-2.5 text-white font-semibold shadow-md hover:bg-green-800 transition">ចូលគណនី</button>

          <div className="text-center text-sm text-slate-500 mt-3">ឬ ចូលដោយ</div>

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

          <p className="text-center text-sm text-slate-500 mt-4">មិនមានគណនី? <Link to="/register" className="text-green-900 font-semibold">បង្កើតគណនី</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login