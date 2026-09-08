import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const brandImage = language === "ar"
    ? "/لقطة شاشة 2026-09-08 142658.png"
    : "/لقطة شاشة 2026-09-08 142613.png";

  return (
    <footer className="mt-10 border-t border-[#ededed] bg-white text-neutral-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <img src={brandImage} alt={t("brand")} className="h-11 w-auto max-w-40 object-contain" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
            {t("footerDescription")}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{t("shop")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li><Link to="/" className="hover:text-neutral-900">{t("home")}</Link></li>
            <li><Link to="/shop" className="hover:text-neutral-900">{t("shop")}</Link></li>
            <li><Link to="/collection" className="hover:text-neutral-900">{t("collections")}</Link></li>
            <li><Link to="/sale" className="hover:text-neutral-900">{t("sale")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{t("support")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li>{t("shipping")}</li>
            <li>{t("returns")}</li>
            <li>{t("privacy")}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{t("follow")}</h2>
          <p className="mt-4 text-sm text-neutral-500">
            {t("followDescription")}
          </p>
        </div>
      </div>

      <div className="border-t border-[#ededed] py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} HARIR. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
