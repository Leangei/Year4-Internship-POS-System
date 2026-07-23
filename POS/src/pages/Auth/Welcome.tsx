import { useNavigate } from "react-router-dom";
import welcomeImage from "../../assets/welcome/welcome.png";
import logo from "../../assets/welcome/logo.png";
import clock from "../../assets/welcome/clock.png";
import star from "../../assets/welcome/star.png";
import thunder from "../../assets/welcome/thunder.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div
        className="w-full max-w-[900px] flex h-[83vh] overflow-hidden rounded-[32px] bg-white shadow-[0_8px_30px_rgba(0,59,20,0.15)] animate-[fadeInUp_0.7s_ease-out_forwards]"
      >
        {/* Left Panel */}
        <div className="w-[48%] flex flex-col items-center justify-center bg-white px-14 py-12 text-center relative">
          <div className="relative z-10 flex flex-col items-center gap-1">
            <img
              src={logo}
              alt="Domrei Logo"
              className="h-16 w-auto transition-transform duration-500 hover:scale-105"
            />
            <h1 className="text-[2.5rem] font-bold tracking-[0.3em] text-[#003B14] mt-1">
              DOMREI
            </h1>
            <h2 className="text-sm tracking-[0.4em] text-[#005F20] font-medium uppercase">
              Point of Sale
            </h2>
            <div className="w-12 h-[2px] bg-[#00CC44] rounded-full mt-1" />
          </div>

          <div className="relative z-10 mt-2 mb-2 flex items-center justify-center">
            <p className="max-w-[260px] text-[13px] leading-7 text-[#003B14]/80 font-medium">
              ប្រព័ន្ធគ្រប់គ្រងការលក់សម្រាប់អាជីវកម្មសម័យថ្មី
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="relative z-10 group rounded-[10px] bg-[#003B14] px-12 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#003B14]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#003B14]/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="relative z-10">ចាប់ផ្តើមប្រើប្រាស់ឥឡូវនេះ</span>
            <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#005F20] to-[#009933] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-[52%] relative overflow-hidden">
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
          
          <img
            src={welcomeImage}
            alt="Fashion"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Floating bubbles */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-[15%] left-[10%] w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 animate-[bubbleFloat_4s_ease-in-out_infinite]" />
            <div className="absolute top-[25%] right-[15%] w-4 h-4 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 animate-[bubbleFloat_5s_ease-in-out_infinite_0.5s]" />
            <div className="absolute top-[50%] left-[20%] w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-[bubbleFloat_3.5s_ease-in-out_infinite_1s]" />
            <div className="absolute top-[60%] right-[10%] w-3 h-3 rounded-full bg-white/35 backdrop-blur-sm border border-white/40 animate-[bubbleFloat_4.5s_ease-in-out_infinite_1.5s]" />
            <div className="absolute top-[35%] left-[5%] w-3.5 h-3.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-[bubbleFloat_3s_ease-in-out_infinite_2s]" />
            <div className="absolute top-[70%] left-[35%] w-4.5 h-4.5 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 animate-[bubbleFloat_5.5s_ease-in-out_infinite_0.8s]" />
            <div className="absolute top-[20%] left-[45%] w-2.5 h-2.5 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 animate-[bubbleFloat_3.8s_ease-in-out_infinite_1.2s]" />
            <div className="absolute top-[80%] right-[25%] w-3.5 h-3.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-[bubbleFloat_4.2s_ease-in-out_infinite_0.3s]" />
          </div>

        
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-6 rounded-2xl bg-white/85 backdrop-blur-md px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40">
            <div className="flex flex-col items-center justify-center text-center min-w-[70px]">
              <span className="text-lg text-[#005F20]">
                <img src={clock} alt="Clock" className="w-5 h-5" />
              </span>
              <p className="mt-1.5 text-xs font-medium text-[#003B14] whitespace-nowrap">គ្រប់គ្រងងាយ</p>
            </div>

            <div className="w-[1px] bg-[#80E5A0] self-stretch" />

            <div className="flex flex-col items-center justify-center text-center min-w-[70px]">
              <span className="text-lg text-[#005F20]">
                <img src={star} alt="Star" className="w-5 h-5" />
              </span>
              <p className="mt-1.5 text-xs font-medium text-[#003B14] whitespace-nowrap">មានប្រសិទ្ធភាព</p>
            </div>

            <div className="w-[1px] bg-[#80E5A0] self-stretch" />

            <div className="flex flex-col items-center justify-center text-center min-w-[70px]">
              <span className="text-lg text-[#005F20]">
                <img src={thunder} alt="Thunder" className="w-5 h-5" />
              </span>
              <p className="mt-1.5 text-xs font-medium text-[#003B14] whitespace-nowrap">លឿនរហ័ស</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;