import { useEffect, useRef, useState } from "react";
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
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", key: "home" },
  { to: "/shop", key: "shop" },
  { to: "/collection", key: "collections" },
  { to: "/sale", key: "latestOffers" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [results, setResults] = useState([]);
  const searchButtonRef = useRef(null);
  const searchPanelRef = useRef(null);
  const { totalItems } = useCart();
  const { ids } = useWishlist();
  const { categories } = useProducts();
  const { t, toggleLanguage, language, categoryName } = useLanguage();
  const { isLoggedIn, login, logout, loginRequested, clearLoginRequest } = useAuth();
  const brandImage = language === "ar"
    ? "/لقطة شاشة 2026-09-08 142658.png"
    : "/لقطة شاشة 2026-09-08 142613.png";

  useEffect(() => {
    if (loginRequested) {
      setShowLogin(true);
      clearLoginRequest();
    }
  }, [clearLoginRequest, loginRequested]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    function closeSearchOnOutsideClick(event) {
      const target = event.target;
      if (!searchButtonRef.current?.contains(target) && !searchPanelRef.current?.contains(target)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeSearchOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeSearchOnOutsideClick);
  }, [searchOpen]);

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
      setAuthError(t("fillFields"));
      toast.error(t("fillFields"));
      return;
    }
    login();
    setShowLogin(false);
    resetAuthFields();
    toast.success(t("loginSuccess"));
  }

  function handleRegister(event) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setAuthError(t("fillFields"));
      toast.error(t("fillFields"));
      return;
    }
    if (password !== confirmPassword) {
      setAuthError(t("passwordsMatch"));
      toast.error(t("passwordsMatch"));
      return;
    }
    login();
    setShowRegister(false);
    resetAuthFields();
    toast.success(t("registerSuccess"));
  }

  function handleLogout() {
    logout();
    toast.success(t("logoutSuccess"));
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
        <div
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            setShowLogin(false);
            setShowRegister(false);
            resetAuthFields();
          }}
        >
          <div
            className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden scrollbar-none
 rounded-xl border border-[#ededed] bg-white md:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative hidden min-h-[90vh] md:block"
              style={{ backgroundImage: "url('/r7.jpg?v=2')", backgroundSize: "cover",  backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <img src={brandImage} alt={t("brand")} className="h-11 w-auto object-contain invert mix-blend-screen" />
                  <h3 className="mt-3 text-4xl font-semibold">{t("heroTitle")}</h3>
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
        <Link to="/" className="block" aria-label={t("brand")}>
          <span className="relative block h-8 w-24 overflow-hidden" aria-hidden="true">
            <img
              src={brandImage}
              alt={t("brand")}
              className="absolute left-1/2 top-1/2 h-32 w-32 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {t(link.key)}
            </NavLink>
          ))}
          <div className="group relative">
            <button type="button" className="text-sm text-neutral-500 hover:text-neutral-900">
              {t("categories")}
            </button>
            <div className="invisible absolute left-0 top-full z-50 max-h-80 min-w-44 overflow-y-auto rounded-lg border border-[#ededed] bg-white py-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {categoryName(category.slug, category.name)}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4 text-neutral-800">
          <button
            ref={searchButtonRef}
            type="button"
            aria-label={t("search")}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <FiSearch className="text-lg" />
          </button>
          <Link to="/wishlist" aria-label={t("wishlist")} className="relative hidden sm:block">
            <FiHeart className="text-lg" />
            {ids.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <Link to="/cart" aria-label={t("cart")} className="relative">
            <BsCart3 className="text-lg" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
          {!isLoggedIn ? (
            <button type="button" aria-label={t("account")} onClick={() => setShowLogin(true)}>
              <FiUser className="text-lg" />
            </button>
          ) : (
            <button type="button" onClick={handleLogout} className="hidden text-sm text-neutral-500 sm:block">
              {t("logout")}
            </button>
          )}
          <button type="button" className="lg:hidden" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <IoClose className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
          <button type="button" onClick={toggleLanguage} className="text-xs font-medium text-neutral-500 hover:text-neutral-900" aria-label={t("language")}>
            {language === "en" ? "AR" : "EN"}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div ref={searchPanelRef} className="border-t border-[#ededed] bg-white">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
            <FiSearch className="text-neutral-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search")}
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
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#ededed] bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {t(link.key)}
              </Link>
            ))}
            <Link to="/Book" onClick={() => setMenuOpen(false)}>{t("lookbook")}</Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>{t("wishlist")}</Link>
            {categories.map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`} onClick={() => setMenuOpen(false)} className="text-neutral-500">
                {categoryName(category.slug, category.name)}
              </Link>
            ))}
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
                className="rounded-md border-[0.5px] border-[#ededed] py-2"
                >
                {t("login")}
              </button>
            ) : (
              <button type="button" onClick={handleLogout} className="rounded-md bg-neutral-900 py-2 text-white">
                {t("logout")}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
