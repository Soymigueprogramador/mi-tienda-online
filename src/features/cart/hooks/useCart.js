import { useContext } from "react";
import { CartContext } from "../context/CartContext";

/* ------------------------------------------------ */
/* CUSTOM HOOK: useCart */
/* ------------------------------------------------ */

/*
Este hook es una abstracción sobre useContext que permite
acceder fácilmente al estado global del carrito desde
cualquier componente de la aplicación.

Centralizar el acceso en un custom hook mejora:

• La legibilidad del código
• La reutilización
• El mantenimiento
• La seguridad del acceso al contexto
*/
export const useCart = () => {

  /*
  useContext permite consumir el valor expuesto por
  CartContext.Provider en el árbol de componentes.
  */
  const context = useContext(CartContext);


  /* ------------------------------------------------ */
  /* VALIDACIÓN DE USO CORRECTO DEL CONTEXTO */
  /* ------------------------------------------------ */

  /*
  Si el hook se utiliza fuera del CartProvider,
  React devolverá "undefined".

  Esta validación previene errores silenciosos
  y obliga a que el contexto sea utilizado dentro
  del Provider correspondiente.
  */
  if (!context) {
    throw new Error(
      "useCart debe usarse dentro de CartProvider"
    );
  }


  /* ------------------------------------------------ */
  /* RETORNO DEL CONTEXTO */
  /* ------------------------------------------------ */

  /*
  Se devuelve el contexto completo para que el
  componente consumidor tenga acceso a:

  - items
  - addToCart
  - removeFromCart
  - increment
  - decrement
  - clearCart
  - totalPrice
  - totalItems
  */
  return context;
};