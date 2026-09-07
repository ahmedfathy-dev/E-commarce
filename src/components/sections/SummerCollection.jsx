import { summerProducts } from "../../data/products";
import ProductGrid from "../products/ProductGrid";

export default function SummerCollection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 sm:mb-10 sm:text-4xl">
          Summer collection
        </h2>
        <ProductGrid products={summerProducts} />
      </div>
    </section>
  );
}
