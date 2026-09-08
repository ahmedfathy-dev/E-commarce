import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-12">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Your cart
          </h1>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-neutral-400 transition hover:text-neutral-900"
            >
              Clear all
            </button>
          )}
        </div>
        <p className="mb-10 text-sm text-neutral-400">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>

        {cart.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-neutral-400">Your cart is empty</p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col divide-y divide-[#ededed] border-y border-[#ededed]">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-5">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="h-24 w-20 rounded-md border border-[#ededed] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      ${Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-neutral-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
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

            <div className="h-fit rounded-lg border border-[#ededed] p-6 lg:w-[320px]">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-5 flex justify-between text-sm text-neutral-500">
                <span>Items ({totalItems})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex justify-between text-sm text-neutral-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="mt-5 flex justify-between border-t border-[#ededed] pt-4 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="mt-6 w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Checkout
              </button>
              <Link to="/shop" className="mt-4 block text-center text-sm text-neutral-400 hover:text-neutral-900">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
