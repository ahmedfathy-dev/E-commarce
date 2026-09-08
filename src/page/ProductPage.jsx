import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { fetchProductById } from "../services/products";
import ProductRating from "../components/products/ProductRating";
import ProductBadge from "../components/products/ProductBadge";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { t, categoryName } = useLanguage();
  const { isLoggedIn, requestLogin } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetchProductById(id, controller.signal)
      .then(setProduct)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError("Product not found");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <h1 className="mt-24 text-center text-2xl text-neutral-400">{t("loadingProduct")}</h1>;
  }

  if (error || !product) {
    return (
      <h1 className="mt-24 text-center text-2xl text-neutral-400">{t("productNotFound")}</h1>
    );
  }

  const title = product.title;
  const image = product.thumbnail || product.images?.[0];
  const discount = Number(product.discountPercentage) || 0;
  const oldPrice = discount > 0 ? product.price / (1 - discount / 100) : null;
  const onSale = discount > 0;

  function handleAddToCart() {
    if (!isLoggedIn) {
      requestLogin();
      return;
    }
    addToCart(product, quantity);
    toast.success(t("addedCart"));
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
            ← {t("back")}
          </button>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-lg border-[0.5px] border-[#ededed] bg-neutral-50">
              {onSale && (
                <div className="absolute left-4 top-4 z-10">
                  <ProductBadge>-{discount.toFixed(0)}% {t("off")}</ProductBadge>
                </div>
              )}
              <img
                src={image}
                alt={title}
                className="aspect-[0.8] w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
                {categoryName(product.category)}
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
                {oldPrice && (
                  <span className="text-neutral-400 line-through">
                    ${oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
                {product.description}
              </p>

              <p className="mt-6 text-sm text-neutral-500">
                {product.brand ? `${product.brand} · ` : ""}{product.stock} {t("inStock")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center overflow-hidden rounded-md border-[0.5px] border-[#ededed]">
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
                  <BsCart3 /> {t("addItem")}
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex h-12 w-12 items-center justify-center rounded-md border-[0.5px] border-[#ededed]"
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
