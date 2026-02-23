import { createContext, useMemo, useState, useEffect } from "react";

// 1️⃣ Creamos el Contexto
export const CartContext = createContext();

/**
 * 2️⃣ Obtener carrito inicial desde localStorage
 * (se ejecuta solo una vez al montar la app)
 */
const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error leyendo localStorage", error);
    return [];
  }
};

// 3️⃣ Provider que envuelve la app
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialCart);

  /**
   * 4️⃣ Persistir automáticamente cada cambio
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

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
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ Eliminar producto directo
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setItems([]);

  // 💰 Total derivado (NO es estado)
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