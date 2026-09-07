import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (Array.isArray(stored)) setIds(stored);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(ids));
  }, [ids]);

  function toggleWishlist(productId) {
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  function isWishlisted(productId) {
    return ids.includes(productId);
  }

  return (
    <WishlistContext.Provider value={{ ids, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
