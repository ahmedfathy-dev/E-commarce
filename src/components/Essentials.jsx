import { products } from "../data/products";
import ProductGrid from "./products/ProductGrid";

function Essentials() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Essentials
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          Quiet pieces for everyday wear.
        </p>
        <ProductGrid products={products.slice(4, 8)} />
      </div>
    </section>
  );
}

export default Essentials;
