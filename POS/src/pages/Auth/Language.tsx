import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Language() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-white rounded-[28px] shadow-[0_8px_30px_rgba(0,59,20,0.15)] p-10 text-center animate-[fadeInUp_0.7s_ease-out_forwards]">
        <h1 className="text-2xl font-extrabold text-[#003B14] mb-2">
          {i18n.language === "en" ? "Select Language" : "ជ្រើសរើសភាសា"}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {i18n.language === "en"
            ? "Choose your preferred language"
            : "សូមជ្រើសរើសភាសាដែលអ្នកចង់ប្រើ"}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => switchLanguage("km")}
            className={`w-full rounded-xl py-4 text-lg font-semibold transition-all duration-300 border-2 ${
              i18n.language === "km"
                ? "bg-[#003B14] text-white border-[#003B14] shadow-lg shadow-[#003B14]/20"
                : "bg-white text-[#003B14] border-[#003B14]/30 hover:border-[#003B14] hover:bg-[#003B14]/5"
            }`}
          >
            <span className="block text-sm font-normal opacity-70 mb-1">
              {i18n.language === "en" ? "Khmer" : "ភាសាខ្មែរ"}
            </span>
            <span className="text-base">ភាសាខ្មែរ</span>
          </button>

          <button
            onClick={() => switchLanguage("en")}
            className={`w-full rounded-xl py-4 text-lg font-semibold transition-all duration-300 border-2 ${
              i18n.language === "en"
                ? "bg-[#003B14] text-white border-[#003B14] shadow-lg shadow-[#003B14]/20"
                : "bg-white text-[#003B14] border-[#003B14]/30 hover:border-[#003B14] hover:bg-[#003B14]/5"
            }`}
          >
            <span className="block text-sm font-normal opacity-70 mb-1">
              {i18n.language === "en" ? "English" : "អង់គ្លេស"}
            </span>
            <span className="text-base">English</span>
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 text-sm text-gray-400 hover:text-[#003B14] transition-colors"
        >
          {i18n.language === "en" ? "← Back to Home" : "← ត្រលប់ទៅទំព័រដើម"}
        </button>
      </div>
    </div>
  );
}

export default Language;