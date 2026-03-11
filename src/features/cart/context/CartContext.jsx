import { createContext, useMemo, useState, useEffect, useContext } from "react";

/* ------------------------------------------------ */
/* CLAVE DE ALMACENAMIENTO EN LOCALSTORAGE */
/* ------------------------------------------------ */

/*
Esta constante define la clave utilizada para guardar
el carrito dentro del localStorage del navegador.

Versionar la clave (v1, v2, etc.) permite invalidar
estructuras viejas del carrito cuando cambia el modelo
de datos del ecommerce.
*/
const CART_STORAGE_KEY = "ecommerce_cart_v1";


/* ------------------------------------------------ */
/* CREACIÓN DEL CONTEXTO GLOBAL DEL CARRITO */
/* ------------------------------------------------ */

/*
CartContext permite compartir el estado del carrito
entre todos los componentes de la aplicación sin
necesidad de pasar props manualmente (prop drilling).
*/
export const CartContext = createContext();


/* ------------------------------------------------ */
/* FUNCIÓN DE HIDRATACIÓN INICIAL DEL CARRITO */
/* ------------------------------------------------ */

/*
Esta función recupera el carrito almacenado en
localStorage al iniciar la aplicación.

También valida que los datos tengan la estructura
correcta para evitar errores si el almacenamiento
fue manipulado o está corrupto.
*/
const getInitialCart = () => {
  try {

    // Obtener el carrito guardado en el navegador
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    // Si no existe información guardada, devolver carrito vacío
    if (!stored) return [];

    // Convertir string JSON a objeto JavaScript
    const parsed = JSON.parse(stored);

    // Validar que sea un array
    if (!Array.isArray(parsed)) return [];

    /*
    Validación básica de estructura de cada item
    para evitar datos corruptos.
    */
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id !== "undefined" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number",
    );

  } catch (error) {

    /*
    Si ocurre un error (JSON corrupto por ejemplo),
    se reinicia el carrito para evitar romper la app.
    */
    console.warn("Cart hydration failed. Resetting cart.", error);

    return [];
  }
};


/* ------------------------------------------------ */
/* PROVIDER DEL CONTEXTO DEL CARRITO */
/* ------------------------------------------------ */

/*
CartProvider envuelve la aplicación y provee
el estado global del carrito a todos los componentes.
*/
export const CartProvider = ({ children }) => {

  /*
  Inicializa el estado del carrito utilizando
  la función de hidratación desde localStorage.
  */
  const [items, setItems] = useState(getInitialCart);


  /* ------------------------------------------------ */
  /* PERSISTENCIA AUTOMÁTICA DEL CARRITO */
  /* ------------------------------------------------ */

  /*
  Cada vez que el carrito cambia, se guarda
  automáticamente en localStorage.
  */
  useEffect(() => {
    try {

      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );

    } catch (error) {

      /*
      Si falla el guardado (por ejemplo, almacenamiento lleno),
      se registra el error en consola.
      */
      console.error("Cart persistence failed", error);
    }

  }, [items]);


  /* ------------------------------------------------ */
  /* ACCIONES DEL CARRITO */
  /* ------------------------------------------------ */

  /*
  Agrega un producto al carrito.
  Si el producto ya existe, incrementa la cantidad.
  */
  const addToCart = (product) => {

    setItems((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Si el producto no existe, se agrega
      return [...prev, { ...product, quantity: 1 }];
    });
  };


  /*
  Permite agregar múltiples productos al carrito
  en una sola operación (por ejemplo al restaurar
  un pedido anterior).
  */
  const addManyToCart = (products) => {

    setItems((prev) => {

      const updated = [...prev];

      products.forEach((product) => {

        const existing = updated.find(
          (item) => item.id === product.id
        );

        if (existing) {

          existing.quantity += product.quantity;

        } else {

          updated.push({ ...product });

        }

      });

      return updated;
    });
  };


  /*
  Incrementa la cantidad de un producto específico.
  */
  const increment = (id) => {

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };


  /*
  Reduce la cantidad de un producto.
  Si la cantidad llega a 0 el producto se elimina.
  */
  const decrement = (id) => {

    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };


  /*
  Elimina completamente un producto del carrito.
  */
  const removeFromCart = (id) => {

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };


  /*
  Vacía completamente el carrito.
  */
  const clearCart = () => {

    setItems([]);

    localStorage.removeItem(CART_STORAGE_KEY);
  };


  /* ------------------------------------------------ */
  /* DERIVED STATE (VALORES CALCULADOS) */
  /* ------------------------------------------------ */

  /*
  Total monetario del carrito.
  useMemo evita recalcularlo en cada render.
  */
  const totalPrice = useMemo(() => {

    return items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  }, [items]);


  /*
  Total de productos en el carrito.
  */
  const totalItems = useMemo(() => {

    return items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

  }, [items]);


  /* ------------------------------------------------ */
  /* PROVIDER DEL CONTEXTO */
  /* ------------------------------------------------ */

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


/* ------------------------------------------------ */
/* CUSTOM HOOK PARA CONSUMIR EL CONTEXTO */
/* ------------------------------------------------ */

/*
Hook que simplifica el acceso al contexto del carrito.

Además incluye una validación para asegurar que
solo se use dentro de CartProvider.
*/
export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe usarse dentro de un CartProvider"
    );
  }

  return context;
};