import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Essentials from "./components/Essentials";
import SaleSection from "./components/SaleSection";
import SummerCollection from "./components/sections/SummerCollection";

import { Routes, Route } from "react-router-dom";

import Shop from "./page/Shop";
import Collections from "./page/Collections";
import SaleSections from "./page/SaleSections";
import Book from "./page/Book";
import Footer from "./page/Footer";
import CategoryPage from "./page/CategoryPage";
import CartPage from "./page/CartPage";
import ProductPage from "./page/ProductPage";
import WishlistPage from "./page/WishlistPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SummerCollection />
              <Collection />
              <Essentials />
              <SaleSection />
              <Footer />
            </>
          }
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/Collection" element={<Collections />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/sale" element={<SaleSections />} />
        <Route path="/Lookbook" element={<Book />} />
        <Route path="/Book" element={<Book />} />
      </Routes>
    </>
  );
}

export default App;
