import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductsProvider } from "./context/ProductsContext";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ProductsProvider>
            <App />
            <Toaster position="top-right" reverseOrder={false} />
          </ProductsProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </LanguageProvider>
);
