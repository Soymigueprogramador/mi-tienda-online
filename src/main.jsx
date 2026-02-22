
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import Router from "./App/Router/Router.jsx";
import { CartProvider } from "./features/cart/context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
    <CartProvider>
      <Router />
    </CartProvider>
);
