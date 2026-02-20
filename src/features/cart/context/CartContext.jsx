// Importando hooks
import { createContext, useState } from "react";

// 1. Creamos el Contexto: Es el "almacén" global de datos.
export const CartContext = createContext();

// 2. Definimos el Provider: El componente que envolverá a la aplicación
// para que todos los hijos tengan acceso al estado del carrito.
export const CartProvider = ({ children }) => {
  // Estado principal: Un array que contendrá los objetos de productos.
  const [items, setItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setItems((prev) => {
      // Verificamos si el producto ya existe comparando IDs
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // Si ya existe, recorremos el array y solo actualizamos la cantidad
        // del producto que coincide, manteniendo el resto igual.
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Si es un producto nuevo, lo agregamos al array con cantidad inicial de 1.
      // Usamos el spread operator [...] para mantener la inmutabilidad.
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto específico usando su ID
  const removeFromCart = (id) => {
    // Filtramos el array: se quedan todos los que NO coincidan con el ID recibido.
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito por completo
  const clearCart = () => setItems([]);

  return (
    /* 3. Proveemos el estado y las funciones a través de 'value'.
      Cualquier componente hijo de CartProvider podrá extraer estos valores.
    */
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};