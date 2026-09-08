import { useProducts } from "../context/ProductsContext";
import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const { products, loading, error } = useProducts();
  const { t } = useLanguage();
  const items = products.filter((item) => ids.includes(item.id));

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {t("wishlist")}
        </h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500">{t("savedPieces")}</p>
        {loading || error ? (
          <ProductGrid products={items} loading={loading} error={error} />
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-400">{t("emptyWishlist")}</p>
            <Link to="/shop" className="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm text-white">
              {t("browseShop")}
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </section>
      <Footer />
    </div>
  );
}
