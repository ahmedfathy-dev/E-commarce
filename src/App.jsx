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

import {
  getProducts,
  getProductsByCategory,
} from "./services/api";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET ALL PRODUCTS
  useEffect(() => {

    fetchAllProducts();

  }, []);

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

  // FILTER CATEGORY FROM API
  async function filterByCategory(category) {

    try {

      setLoading(true);

      // ALL PRODUCTS
      if (category === "all") {

        fetchAllProducts();

        return;

      }

      // CATEGORY PRODUCTS
      const data = await getProductsByCategory(category);

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
      <Navbar filterByCategory={filterByCategory} />

      <Routes>

        {/* Home */}
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

        {/* Pages */}
        <Route path="/shop" element={<Shop />} />

        <Route path="/Collection" element={<Collections />} />

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

        <Route path="/Footer" element={<Footer />} />

      </Routes>
    </>
  );
}

export default App;