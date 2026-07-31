import { useTranslation } from "react-i18next";

export default function ProductDescription() {
  const { t } = useTranslation('productDetail')
  return (
    <div
      className="
        rounded-[20px]
        border
        border-[#E7E8E9]
        bg-white
        p-5
      "
    >
      <h3
        className="
          font-semibold
          text-[#191C1D]
          text-base
        "
      >
        {t('aboutProduct')}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-[#404941]
          leading-relaxed
        "
      >
        Good Quality
      </p>
    </div>
  );
}