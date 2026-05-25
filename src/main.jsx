import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext"; // ← جديد

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider> {/* ← جديد */}
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider> {/* ← جديد */}
  </BrowserRouter>
);