import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="hero-section relative isolate overflow-hidden bg-[#fbfaf8]">
      <svg
        className="hero-line"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="hero-line-path"
          d="M-80 260 C 110 76, 290 72, 405 235 S 620 475, 835 300 S 1060 78, 1510 235"
        />
      </svg>

      <div className="relative z-10 mx-auto grid min-h-[68vh] max-w-7xl items-center gap-8 px-5 pb-8 pt-0 sm:px-8 md:gap-10 md:pb-10 lg:grid-cols-2 lg:gap-8 lg:pb-12">
        <div className="hero-copy max-w-xl">
          <p className="hero-eyebrow text-xs tracking-[0.28em] text-neutral-600 uppercase">
            {t("newSeason")}
          </p>
          <h1 className="hero-title mt-4 max-w-xl text-5xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-6xl lg:text-[5.4rem] lg:leading-[0.94]" aria-label={t("heroTitle")}>
            {language === "en" ? (
              <>
                <span className="block">Define your</span>
                <span className="block">style</span>
              </>
            ) : t("heroTitle")}
          </h1>
          <p className="hero-description mt-6 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
            {t("heroDescription")}
          </p>
          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              {t("shopNow")}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              to="/collection"
              className="rounded-md border-[0.5px] border-neutral-300 bg-white/50 px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
            >
              {t("collections")}
            </Link>
          </div>
        </div>

        <div className="hero-visual animate-fadeInUp delay-300 relative flex min-h-65 items-center justify-center md:min-h-95 lg:min-h-115">
          <img src="/r7.jpg?v=2" alt="Ronaldo graphic t-shirt" className="hero-image h-auto w-full max-w-135 object-contain" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
