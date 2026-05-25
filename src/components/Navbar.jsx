import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useCart } from "../context/CartContext";

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

  const { totalItems } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://test.tsdtecheg.com/api/Allcategory");
        const data = await response.json();
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
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Register Success");
        setShowRegister(false);
        setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
      } else {
        toast.error(data.message || "Register Failed");
      }
    } catch (error) {
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

      {/* Login Modal */}
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

      {/* Register Modal */}
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

      {/* Logo */}
      <div className="flex items-center gap-3 pl-6">
        <Link to="/" className="font-bold text-4xl text-gray-300">WOMEN</Link>
      </div>

      {/* Desktop Links */}
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

      {/* Desktop Icons + Auth */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)} className="text-gray-700 hover:text-amber-900 transition text-lg">Login</button>
        ) : (
          <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-full hover:bg-amber-900 transition">Logout</button>
        )}
        <div className="flex gap-6 text-2xl items-center">
          {/* 🛒 Cart Icon → روح على /cart */}
          <Link to="/cart" className="relative text-gray-700 hover:text-amber-900 transition">
            <BsCart3 />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-3xl text-gray-600 cursor-pointer">
        {menuOpen ? <IoClose onClick={() => setMenuOpen(false)} /> : <HiMenuAlt3 onClick={() => setMenuOpen(true)} />}
      </div>

      {/* Mobile Menu */}
      <div className={` absolute top-[90px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden md:hidden ${menuOpen ? "max-h-[700px]" : "max-h-0"}`}>
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
            {/* Mobile Cart */}
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative text-gray-700">
              <BsCart3 />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}