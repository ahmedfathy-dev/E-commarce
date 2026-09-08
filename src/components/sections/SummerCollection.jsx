import { useProducts } from "../../context/ProductsContext";
import ProductGrid from "../products/ProductGrid";
import { useLanguage } from "../../context/LanguageContext";

export default function SummerCollection() {
  const { products, loading, error } = useProducts();
  const { t } = useLanguage();

  return (
    <section className="bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 sm:mb-10 sm:text-4xl">
          {t("summerCollection")}
        </h2>
        <ProductGrid products={products.slice(8, 12)} loading={loading} error={error} />
      </div>
    </section>
  );
}
