import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

function Collections() {
  const { products, loading, error } = useProducts();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t("collections")}
        </h1>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          {t("collectionDescription")}
        </p>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>
      <Footer />
    </div>
  );
}

export default Collections;
