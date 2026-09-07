import { saleProducts } from "../data/products";
import ProductGrid from "./products/ProductGrid";

function SaleSection({ padded = false }) {
  return (
    <section className={`bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16 ${padded ? "pt-10" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Special offers
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          Selected pieces, reduced for a limited time.
        </p>
        <ProductGrid products={saleProducts.slice(0, 4)} />
      </div>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Special offers
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-sm text-neutral-500">
          Selected pieces, reduced for a limited time.
        </p>
        <ProductGrid products={saleProducts.slice(0, 4)} />
      </div>
    </section>
  );
}

export default SaleSection;
