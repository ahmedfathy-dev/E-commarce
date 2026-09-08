import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

const looks = [
  { img: "/a.jpg", title: "urbanStreet", desc: "urbanStreetDescription" },
  { img: "/ss.jpg", title: "minimalFit", desc: "minimalFitDescription" },
  { img: "/gg.jpg", title: "winterVibes", desc: "winterVibesDescription" },
];

function Lookbook() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white px-5 py-16 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t("lookbook")}
        </h2>
        <p className="mt-3 mb-10 max-w-xl text-sm text-neutral-500">
          {t("lookbookDescription")}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {looks.map((item) => (
            <div key={item.title} className="group overflow-hidden rounded-lg border-[0.5px] border-[#ededed]">
              <img
                src={item.img}
                alt={t(item.title)}
                className="aspect-[0.8] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="px-4 py-4">
                <h3 className="font-semibold text-neutral-900">{t(item.title)}</h3>
                <p className="mt-1 text-sm text-neutral-400">{t(item.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Lookbook;
