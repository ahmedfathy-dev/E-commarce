import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { SiIlovepdf } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";             // ← جديد
import { useCart } from "../context/CartContext";      // ← جديد

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCart, setShowCart] = useState(false);    // ← جديد

  const { cart, totalItems, removeFromCart } = useCart(); // ← جديد

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://test.tsdtecheg.com/api/Allcategory");
        const data = await response.json();
        console.log("CATEGORIES:", data);
        setCategories(data.categories || data.data || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://test.tsdtecheg.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);
      if (response.ok && (data.token || data.access_token)) {
        localStorage.setItem("token", data.token || data.access_token);
        setIsLoggedIn(true);
        setShowLogin(false);
        setEmail("");
        setPassword("");
        toast.success("Login Success");
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("https://test.tsdtecheg.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("Register Success");
        setShowRegister(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Register Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logout Success");
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-10 flex items-center justify-between shadow-sm bg-white/30 backdrop-blur-md">

      {/* ===== Login Modal ===== */}
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-[9999]">
          <form onSubmit={handleLogin} className="bg-white w-[90%] max-w-[400px] p-8 rounded-2xl flex flex-col gap-4 shadow-2xl">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <button type="submit" className="bg-black text-white py-3 rounded-lg hover:bg-amber-900 transition">Login</button>
            <button type="button" onClick={() => { setShowLogin(false); setShowRegister(true); }} className="text-blue-500">Create Account</button>
            <button type="button" onClick={() => setShowLogin(false)} className="border py-3 rounded-lg">Cancel</button>
          </form>
        </div>
      )}

      {/* ===== Register Modal ===== */}
      {showRegister && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-[9999]">
          <form onSubmit={handleRegister} className="bg-white w-[90%] max-w-[400px] p-8 rounded-2xl flex flex-col gap-4 shadow-2xl">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-3 rounded-lg outline-none" />
            <button type="submit" className="bg-black text-white py-3 rounded-lg hover:bg-amber-900 transition">Register</button>
            <button type="button" onClick={() => setShowRegister(false)} className="border py-3 rounded-lg">Cancel</button>
          </form>
        </div>
      )}

      {/* ===== 🛒 Cart Drawer ===== */}
      {showCart && (
        <div className="fixed top-0 right-0 h-full w-[340px] bg-white shadow-2xl z-[9999] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-2xl font-bold">🛒 Cart</h2>
            <button onClick={() => setShowCart(false)} className="text-3xl hover:text-red-500 transition">
              <IoClose />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 mt-20 text-lg">Your cart is empty 🛍️</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-100 p-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-xl transition"
                  >
                    <IoClose />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-6 py-4 border-t">
              <p className="font-bold text-xl mb-4">
                Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-amber-900 transition font-semibold">
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== Logo ===== */}
      <div className="flex items-center gap-3 pl-6">
        <Link to="/" className="font-bold text-4xl text-gray-300">MANS</Link>
      </div>

      {/* ===== Desktop Links ===== */}
      <div className="hidden md:flex gap-10 text-gray-700 text-xl items-center">
        <Link to="/" className="hover:text-amber-900 px-2 py-1 rounded">Home</Link>
        <Link to="/shop" className="hover:text-amber-900">Shop</Link>
        <Link to="/collection" className="hover:text-amber-900">Clothing</Link>
        <Link to="/Book" className="hover:text-amber-900">Lookbook</Link>
        <Link to="/sale" className="hover:text-amber-700">Sale</Link>
        <div className="relative group">
          <button className="hover:text-amber-900 cursor-pointer">Categories</button>
          <div className="absolute hidden group-hover:flex flex-col bg-white shadow-xl rounded-xl p-4 top-8 min-w-[220px] z-50">
            {Array.isArray(categories) && categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} className="py-2 hover:text-amber-900 transition">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Desktop Icons + Auth ===== */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)} className="text-gray-700 hover:text-amber-900 transition text-lg">Login</button>
        ) : (
          <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-full hover:bg-amber-900 transition">Logout</button>
        )}
        <div className="flex gap-6 text-2xl items-center">
          <SiIlovepdf />
          <CiSearch />
          {/* 🛒 Cart Icon */}
          <button onClick={() => setShowCart(true)} className="relative text-gray-700 hover:text-amber-900 transition">
            <BsCart3 />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ===== Mobile Menu Button ===== */}
      <div className="md:hidden text-3xl text-gray-600 cursor-pointer">
        {menuOpen ? <IoClose onClick={() => setMenuOpen(false)} /> : <HiMenuAlt3 onClick={() => setMenuOpen(true)} />}
      </div>

      {/* ===== Mobile Menu ===== */}
      <div className={`absolute top-[90px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden md:hidden ${menuOpen ? "max-h-[700px] py-6" : "max-h-0"}`}>
        <div className="flex flex-col items-center gap-6 text-gray-700 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/collection" onClick={() => setMenuOpen(false)}>Clothing</Link>
          <Link to="/Book" onClick={() => setMenuOpen(false)}>Lookbook</Link>
          <Link to="/sale" onClick={() => setMenuOpen(false)}>Sale</Link>
          <div className="flex flex-col gap-4">
            {Array.isArray(categories) && categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} onClick={() => setMenuOpen(false)} className="hover:text-amber-900 transition">
                {category.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-full px-6">
            {!isLoggedIn ? (
              <button onClick={() => { setShowLogin(true); setMenuOpen(false); }} className="w-full border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition">Login</button>
            ) : (
              <button onClick={handleLogout} className="w-full bg-black text-white py-2 rounded-full hover:bg-amber-900 transition">Logout</button>
            )}
          </div>
          <div className="flex gap-6 text-2xl pt-2 items-center">
            <SiIlovepdf />
            <CiSearch />
            {/* 🛒 Mobile Cart Icon */}
            <button onClick={() => { setShowCart(true); setMenuOpen(false); }} className="relative text-gray-700">
              <BsCart3 />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}