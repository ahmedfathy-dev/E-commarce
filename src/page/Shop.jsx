import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { searchProducts } from "../services/products";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";

function Shop() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { products, loading: catalogLoading, error: catalogError } = useProducts();
  const [items, setItems] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (!query) {
      setItems(products);
      return undefined;
    }

    const controller = new AbortController();
    setSearchLoading(true);
    setSearchError("");
    searchProducts(query, controller.signal)
      .then(setItems)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setSearchError("Search is unavailable right now.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setSearchLoading(false);
      });

    return () => controller.abort();
  }, [query, products]);

  const loading = query ? searchLoading : catalogLoading;
  const error = query ? searchError : catalogError;

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Shop</h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500">
          {query ? `Results for “${query}”` : "The full catalog, ready to wear."}
        </p>
        {query && (
          <Link to="/shop" className="mb-8 inline-block text-sm text-neutral-500 hover:text-neutral-900">
            Clear search
          </Link>
        )}
        <ProductGrid products={items} loading={loading} error={error} />
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
