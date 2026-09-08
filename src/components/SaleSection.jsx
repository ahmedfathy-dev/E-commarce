import { useProducts } from "../context/ProductsContext";
import ProductGrid from "./products/ProductGrid";
import { useLanguage } from "../context/LanguageContext";

function SaleSection({ padded = false }) {
  const { products, loading, error } = useProducts();
  const { t } = useLanguage();
  const saleProducts = products.filter((product) => Number(product.discountPercentage) > 0);

  return (
    <section id="latest-offers" className={`bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16 ${padded ? "pt-10" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t("latestOffers")}
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          {t("offersDescription")}
        </p>
        <ProductGrid products={saleProducts.slice(0, 4)} loading={loading} error={error} />
      </div>
    </section>
  );
}

export default SaleSection;
