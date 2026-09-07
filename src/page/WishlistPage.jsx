import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((item) => ids.includes(item.id));

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Wishlist
        </h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500">Saved pieces.</p>
        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-400">Your wishlist is empty</p>
            <Link to="/shop" className="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm text-white">
              Browse the shop
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
