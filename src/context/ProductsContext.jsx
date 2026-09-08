import { createContext, useContext, useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../services/products";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([fetchProducts(controller.signal), fetchCategories(controller.signal)])
      .then(([items, categoryItems]) => {
        setProducts(items);
        setCategories(
          categoryItems.map((category) =>
            typeof category === "string"
              ? { slug: category, name: category }
              : category
          )
        );
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError("We could not load the catalog. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used inside ProductsProvider");
  return context;
}
