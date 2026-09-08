import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const { t } = useLanguage();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("vodafone");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wallets = [
    { id: "vodafone", name: "Vodafone Cash", balance: "2,500 EGP" },
    { id: "etisalat", name: "Etisalat Cash", balance: "1,800 EGP" },
    { id: "orange", name: "Orange Cash", balance: "3,200 EGP" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {t("cart")}
          </h1>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-neutral-400 transition hover:text-neutral-900"
            >
              {t("clearAll")}
            </button>
          )}
        </div>
        <p className="mb-10 text-sm text-neutral-400">
          {totalItems} {totalItems === 1 ? t("item") : t("items")}
        </p>

        {cart.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-neutral-400">{t("emptyCart")}</p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm text-white"
            >
              {t("continueShopping")}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col divide-y divide-[#ededed] border-y border-[#ededed]">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center gap-4 py-5">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="h-24 w-20 rounded-md border-[0.5px] border-[#ededed] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <div className="mt-3 inline-flex items-center overflow-hidden rounded-md border-[0.5px] border-[#ededed] bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-lg leading-none text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                        aria-label={t("decreaseQuantity")}
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm font-medium text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-lg leading-none text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                        aria-label={t("increaseQuantity")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-neutral-900"
                    aria-label="Remove"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-lg border-[0.5px] border-[#ededed] p-6 lg:w-[320px]">
              <h2 className="text-lg font-semibold">{t("orderSummary")}</h2>
              <div className="mt-5 flex justify-between text-sm text-neutral-500">
                <span>Items ({totalItems})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex justify-between text-sm text-neutral-500">
                <span>{t("shipping")}</span>
                <span>{t("free")}</span>
              </div>
              <div className="mt-5 flex justify-between border-t border-[#ededed] pt-4 font-semibold">
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="mt-6 w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {t("checkout")}
              </button>
              <Link to="/shop" className="mt-4 block text-center text-sm text-neutral-400 hover:text-neutral-900">
                {t("continueShopping")}
              </Link>
            </div>
          </div>
        )}
      </div>

      {checkoutOpen && (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg border-[0.5px] border-[#ededed] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{t("temporaryCheckout")}</p>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{t("chooseWallet")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="text-neutral-400 transition hover:text-neutral-900"
                aria-label={t("close")}
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {wallets.map((wallet) => (
                <label
                  key={wallet.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md border-[0.5px] p-4 transition ${
                    selectedWallet === wallet.id
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-[#ededed] hover:border-neutral-400"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="wallet"
                      value={wallet.id}
                      checked={selectedWallet === wallet.id}
                      onChange={(event) => setSelectedWallet(event.target.value)}
                      className="accent-neutral-900"
                    />
                    <span>
                      <span className="block text-sm font-medium text-neutral-900">{wallet.name}</span>
                      <span className="mt-1 block text-xs text-neutral-400">{t("paymentWallet")}</span>
                    </span>
                  </span>
                  <span className="text-right text-xs text-neutral-400">
                    <span className="block">{t("walletBalance")}</span>
                    <span className="mt-1 block font-medium text-neutral-700">{wallet.balance}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#ededed] pt-4">
              <span className="text-sm text-neutral-500">{t("total")}</span>
              <span className="text-lg font-semibold text-neutral-900">${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="mt-5 w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t("confirmPayment")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
