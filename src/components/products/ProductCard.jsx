import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProductRating from "./ProductRating";
import ProductBadge from "./ProductBadge";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({ product, index = 0, reveal = true }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { t, categoryName } = useLanguage();
  const { isLoggedIn, requestLogin } = useAuth();

  if (!product) return null;

  const title = product.title || "Untitled";
  const image = product.thumbnail || product.images?.[0] || "/ss.jpg";
  const description = product.description || "Premium fashion essential.";
  const price = Number(product.price);
  const discount = Number(product.discountPercentage) || 0;
  const oldPrice = discount > 0 ? price / (1 - discount / 100) : null;
  const rating = product.rating ?? 0;
  const onSale = discount > 0;
  const wished = isWishlisted(product.id);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg border-[0.5px] border-[#f0f0f0] bg-white transition duration-300 hover:-translate-y-1 ${
        reveal ? "product-reveal" : ""
      }`}
      style={reveal ? { animationDelay: `${index * 90}ms` } : undefined}
    >
      <div className="relative aspect-[0.8] overflow-hidden bg-neutral-100">
        <button
          type="button"
          className="block h-full w-full"
          onClick={() => navigate(`/product/${product.id}`)}
          aria-label={`${t("shop")} ${title}`}
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        {onSale && (
          <div className="absolute left-3 top-3 z-10">
            <ProductBadge>-{discount.toFixed(0)}% {t("off")}</ProductBadge>
          </div>
        )}

        <button
          type="button"
          aria-label={wished ? t("removeWishlist") : t("addWishlist")}
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-neutral-800 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100 focus-visible:opacity-100 ${
            wished ? "opacity-100" : ""
          }`}
        >
          <FiHeart className={wished ? "fill-neutral-900" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <ProductRating value={rating} />

        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-neutral-900">
            {title}
          </h3>
          <div className="shrink-0 text-right">
            <p className="text-[15px] font-semibold text-neutral-900">
              {Number.isFinite(price) ? `$${price.toFixed(2)}` : ""}
            </p>
            {onSale && Number.isFinite(oldPrice) && (
              <p className="text-xs text-neutral-400 line-through">
                ${oldPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <p className="mt-1 line-clamp-1 text-[13px] text-neutral-400">
          {description}
        </p>

        <p className="mt-2 line-clamp-1 text-xs capitalize text-neutral-400">
          {product.brand ? `${product.brand} · ` : ""}{categoryName(product.category)}
          {product.stock != null ? ` · ${product.stock} ${t("inStock")}` : ""}
        </p>

        <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (!isLoggedIn) {
              requestLogin();
              return;
            }
            addToCart(product);
            toast.success(t("addedCart"));
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border-[0.5px] border-neutral-900 bg-neutral-900 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-black hover:opacity-90 active:scale-[0.99]"
        >
          <BsCart3 className="text-sm" />
          {t("addItem")}
        </button>
        </div>
      </div>
    </article>
  );
}
