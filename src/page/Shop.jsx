import { Link, useSearchParams } from "react-router-dom";
import { products, searchProducts } from "../data/products";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";

function Shop() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const items = query ? searchProducts(query) : products;

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
        <ProductGrid products={items} />
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
