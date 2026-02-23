import { useContext } from "react";
import { CartContext } from "../context/CartContext";

/**
 * Hook de acceso al CartContext
 * Solo expone el contexto. NO maneja estado ni lógica.
 */
export const useCart = () => {
  const context = useContext(CartContext);

  // Protección contra uso fuera del Provider
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
};