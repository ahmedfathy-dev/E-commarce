import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";

function Collections() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Collections
        </h1>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          Jackets, layers, and pieces built to move from street to evening.
        </p>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>
      <Footer />
    </div>
  );
}

export default Collections;
