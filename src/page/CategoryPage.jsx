import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { fetchProductsByCategory } from "../services/products";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage() {
  const { id } = useParams();
  const { categories } = useProducts();
  const { t, categoryName } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const category = categories.find((item) => item.slug === id);
  const categoryTitle = categoryName(id, category?.name || t("category"));

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetchProductsByCategory(id, controller.signal)
      .then(setItems)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError("We could not load this category.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">{t("category")}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {categoryTitle}
        </h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500">
          {t("exploreCollection")}
        </p>

        {loading || error ? (
          <ProductGrid products={items} loading={loading} error={error} />
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-400">{t("noProducts")}</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-neutral-900 underline">
              {t("shop")}
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
      <Footer />
    </div>
  );
}
