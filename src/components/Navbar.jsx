import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductsContext";
import { searchProducts } from "../services/products";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collection", label: "Collections" },
  { to: "/sale", label: "Sale" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [results, setResults] = useState([]);
  const { totalItems } = useCart();
  const { ids } = useWishlist();
  const { categories } = useProducts();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const value = query.trim();
    if (!value) {
      setResults([]);
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      searchProducts(value, controller.signal)
        .then((items) => setResults(items.slice(0, 6)))
        .catch((requestError) => {
          if (requestError.name !== "AbortError") setResults([]);
        });
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  function resetAuthFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAuthError("");
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!email || !password) {
      setAuthError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }
    localStorage.setItem("token", "local-session");
    setIsLoggedIn(true);
    setShowLogin(false);
    resetAuthFields();
    toast.success("Login Success");
  }

  function handleRegister(event) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setAuthError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    localStorage.setItem("token", "local-session");
    setIsLoggedIn(true);
    setShowRegister(false);
    resetAuthFields();
    toast.success("Register Success");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logout Success");
  }

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    setSearchOpen(false);
    if (value) navigate(`/shop?q=${encodeURIComponent(value)}`);
    else navigate("/shop");
  }

  const linkClass = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#ededed] bg-white">
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4">
          <div className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden scrollbar-none
 rounded-xl border border-[#ededed] bg-white md:grid-cols-2">
            <div
              className="relative hidden min-h-[90vh] md:block"
              style={{ backgroundImage: "url('/c.jpg')", backgroundSize: "cover",  backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs tracking-[0.25em] uppercase">HARER</p>
                <h3 className="mt-3 text-4xl font-semibold">Define your style</h3>
              </div>
            </div>
            {showLogin ? (
              <LoginForm
                email={email}
                password={password}
                error={authError}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
                onSwitch={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                  setAuthError("");
                }}
                onClose={() => {
                  setShowLogin(false);
                  resetAuthFields();
                }}
              />
            ) : (
              <RegisterForm
                name={name}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                error={authError}
                onNameChange={setName}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSubmit={handleRegister}
                onSwitch={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                  setAuthError("");
                }}
                onClose={() => {
                  setShowRegister(false);
                  resetAuthFields();
                }}
              />
            )}
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="text-lg font-semibold tracking-[0.18em] text-neutral-900">
          HARER
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
          <div className="group relative">
            <button type="button" className="text-sm text-neutral-500 hover:text-neutral-900">
              Categories
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-44 rounded-lg border border-[#ededed] bg-white py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4 text-neutral-800">
          <button type="button" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}>
            <FiSearch className="text-lg" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
            <FiHeart className="text-lg" />
            {ids.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <BsCart3 className="text-lg" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
          {!isLoggedIn ? (
            <button type="button" aria-label="Account" onClick={() => setShowLogin(true)}>
              <FiUser className="text-lg" />
            </button>
          ) : (
            <button type="button" onClick={handleLogout} className="hidden text-sm text-neutral-500 sm:block">
              Logout
            </button>
          )}
          <button type="button" className="lg:hidden" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <IoClose className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[#ededed] bg-white">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
            <FiSearch className="text-neutral-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          {results.length > 0 && (
            <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
              {results.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  <img src={item.thumbnail} alt="" className="h-10 w-10 rounded object-cover" />
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-[#ededed] bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/Book" onClick={() => setMenuOpen(false)}>Lookbook</Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            {categories.map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`} onClick={() => setMenuOpen(false)} className="text-neutral-500">
                {category.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
                className="rounded-md border border-[#ededed] py-2"
              >
                Login
              </button>
            ) : (
              <button type="button" onClick={handleLogout} className="rounded-md bg-neutral-900 py-2 text-white">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
