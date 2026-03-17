import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import Router from "./App/Router/Router.jsx";
import { CartProvider } from "./features/cart/context/CartContext.jsx";
import { ToastProvider } from "./features/ui/context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ToastProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </ToastProvider>
  </AuthProvider>,
);