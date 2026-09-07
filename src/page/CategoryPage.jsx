import { useParams, Link } from "react-router-dom";
import { categories, getProductsByCategory } from "../data/products";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find((item) => item.id === id);
  const items = getProductsByCategory(id);
  const categoryName = category?.name || "Category";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">Category</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500">
          {category?.line || "Explore our latest collection"}
        </p>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-400">No products found</p>
            <Link to="/shop" className="mt-4 inline-block text-sm text-neutral-900 underline">
              Back to shop
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
