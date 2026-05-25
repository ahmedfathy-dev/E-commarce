import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Essentials from "./components/Essentials";
import SaleSection from "./components/SaleSection";

import { Routes, Route } from "react-router-dom";

import Shop from "./page/Shop";
import Collections from "./page/Collections";
import SaleSections from "./page/SaleSections";
import Book from "./page/Book";
import Footer from "./page/Footer";
import CategoryPage from "./page/CategoryPage";
import CartPage from "./page/CartPage"; 
import ProductPage from "./page/ProductPage";

import {
  getProducts,
  getProductsByCategory,
} from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ALL PRODUCTS
  async function fetchAllProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      const productsWithDiscount = data.map((item, index) => ({
        ...item,
        oldPrice: (Number(item.price) + 40).toFixed(2),
        discount:
          index % 3 === 0
            ? "-30%"
            : index % 2 === 0
            ? "-25%"
            : "-20%",
      }));

      setProducts(productsWithDiscount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 CATEGORY FILTER (FIXED)
  async function filterByCategory(categoryId) {
    try {
      setLoading(true);

      if (categoryId === "all") {
        await fetchAllProducts();
        return;
      }

      const data = await getProductsByCategory(categoryId);

      const productsWithDiscount = data.map((item, index) => ({
        ...item,
        oldPrice: (Number(item.price) + 40).toFixed(2),
        discount:
          index % 3 === 0
            ? "-30%"
            : index % 2 === 0
            ? "-25%"
            : "-20%",
      }));

      setProducts(productsWithDiscount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🔥 IMPORTANT: now Navbar sends only ID */}
      <Navbar filterByCategory={filterByCategory} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Collection />
              <Essentials />

              <SaleSection
                saleItems={products}
                loading={loading}
              />

              <Footer />
            </>
          }
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/Collection" element={<Collections />} />
<Route path="/category/:id" element={<CategoryPage />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/product/:id" element={<ProductPage />} />


        <Route
          path="/sale"
          element={
            <SaleSections
              saleItems={products}
              loading={loading}
            />
          }
        />

        <Route
          path="/Lookbook"
          element={
            <SaleSections
              saleItems={products}
              loading={loading}
            />
          }
        />

        <Route path="/Book" element={<Book />} />
      </Routes>
    </>
  );
}

export default App;