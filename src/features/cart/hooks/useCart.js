import { useContext } from "react";
import { CartContext } from "../../../features/cart/context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  // 🔐 Protección contra múltiples instancias o mal montaje
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
};