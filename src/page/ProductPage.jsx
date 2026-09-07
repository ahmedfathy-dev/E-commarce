import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../data/products";
import ProductRating from "../components/products/ProductRating";
import ProductBadge from "../components/products/ProductBadge";
import Footer from "./Footer";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);

  if (!product) {
    return (
      <h1 className="mt-24 text-center text-2xl text-neutral-400">Product not found</h1>
    );
  }

  const title = product.name || product.title;
  const colors = product.colors || [];
  const onSale = Boolean(product.discount || product.oldPrice);

  function handleAddToCart() {
    addToCart(product, quantity);
    toast.success("Added to cart");
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 text-sm text-neutral-400 transition hover:text-neutral-900"
          >
            ← Back
          </button>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-lg border border-[#ededed] bg-neutral-50">
              {onSale && (
                <div className="absolute left-4 top-4 z-10">
                  <ProductBadge>Sale</ProductBadge>
                </div>
              )}
              <img
                src={product.image}
                alt={title}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
                {product.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                {title}
              </h1>
              <div className="mt-3">
                <ProductRating value={product.rating ?? 4.8} />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-2xl font-semibold text-neutral-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-neutral-400 line-through">
                    ${Number(product.oldPrice).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
                {product.description}
              </p>

              {colors.length > 0 && (
                <div className="mt-6 flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setColorIndex(index)}
                      className={`h-5 w-5 rounded-full border ${
                        colorIndex === index ? "border-neutral-900" : "border-neutral-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center overflow-hidden rounded-md border border-[#ededed]">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="px-4 py-3 text-lg text-neutral-500 hover:text-neutral-900"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="px-4 py-3 text-lg text-neutral-500 hover:text-neutral-900"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  <BsCart3 /> Add Item
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-[#ededed]"
                  aria-label="Wishlist"
                >
                  <FiHeart className={isWishlisted(product.id) ? "fill-neutral-900" : ""} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
