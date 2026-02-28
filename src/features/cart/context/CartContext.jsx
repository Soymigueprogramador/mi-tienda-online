import { createContext, useMemo, useState, useEffect } from "react";

const CART_STORAGE_KEY = "ecommerce_cart_v1";

export const CartContext = createContext();

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id !== "undefined" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number",
    );
  } catch (error) {
    console.warn("Cart hydration failed. Resetting cart.", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Cart persistence failed", error);
    }
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addManyToCart = (products) => {
    setItems((prev) => {
      const updated = [...prev];

      products.forEach((product) => {
        const existing = updated.find((item) => item.id === product.id);

        if (existing) {
          existing.quantity += product.quantity;
        } else {
          updated.push({ ...product });
        }
      });

      return updated;
    });
  };

  const increment = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  /**
   * 💰 Total monetario derivado
   */
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  /**
   * 🛒 Total de unidades en carrito (ESTO FALTABA)
   */
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addManyToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};