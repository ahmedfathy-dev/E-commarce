import { useProducts } from "../context/ProductsContext";
import ProductGrid from "./products/ProductGrid";
import { useLanguage } from "../context/LanguageContext";

function Collection() {
  const { products, loading, error } = useProducts();
  const { t } = useLanguage();

  return (
    <section className="bg-[#fafafa] px-5 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t("newCollection")}
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          {t("collectionDescription")}
        </p>
        <ProductGrid products={products.slice(0, 8)} loading={loading} error={error} />
      </div>
    </section>
  );
}

export default Collection;
