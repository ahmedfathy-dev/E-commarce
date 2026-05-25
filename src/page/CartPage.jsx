import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const fallbackImages = [
  "/ss.jpg", "/aa.jpg", "/a.jpg",
  "/e.jpg", "/k.jpg", "/p.jpg",
];

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems } = useCart(); // ← جديد clearCart

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6 md:px-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold text-gray-800">Your Cart 🛒</h1>

        {/* 🗑️ Clear All Button */}
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 bg-red-700 text-white px-6 py-4 rounded-xl hover:bg-red-600 transition text-xl font-semibold"
          >
            <IoClose className="text-lg" />
            Clear All
          </button>
        )}
      </div>

      <p className="text-gray-400 mb-10">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 gap-6">
          <p className="text-2xl text-gray-400">Your cart is empty 🛍️</p>
          <Link to="/Shop" className="bg-black text-white px-8 py-3 rounded-xl hover:bg-amber-900 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                <img
                  src={item.image || fallbackImages[item.id % fallbackImages.length]}
                  alt={item.name}
                  onError={(e) => { e.target.src = fallbackImages[item.id % fallbackImages.length]; }}
                  className="w-24 h-24 object-contain rounded-xl bg-gray-100 p-2"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">${item.price} × {item.quantity}</p>
                  <p className="font-bold text-black mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 text-2xl transition"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-[320px] bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between text-gray-500 mb-3">
              <span>Items ({totalItems})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-6">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-amber-900 transition font-semibold text-lg">
              Checkout
            </button>
            <Link to="/Shop" className="block text-center mt-4 text-gray-400 hover:text-black transition">
              Continue Shopping
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}