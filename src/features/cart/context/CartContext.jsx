import { createContext, useMemo, useState } from "react";

// 1️⃣ Creamos el Contexto
export const CartContext = createContext();

// 2️⃣ Provider que envuelve la app
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // ➕ Agregar producto
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 🔼 Incrementar cantidad desde Checkout
  const increment = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // 🔽 Decrementar cantidad
  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // elimina si llega a 0
    );
  };

  // ❌ Eliminar producto directo
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setItems([]);

  // 💰 Total derivado (NO es estado, se calcula)
  const totalPrice = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};