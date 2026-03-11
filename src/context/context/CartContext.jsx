// Importamos las herramientas necesarias de React
// createContext → crea el contexto global
// useContext → permite consumir el contexto
// useReducer → manejar estado complejo
// useMemo → optimizar cálculos derivados
import { createContext, useContext, useReducer, useMemo } from "react";

/* ------------------------------------------------ */
/* ESTADO INICIAL DEL CARRITO */
/* ------------------------------------------------ */

// Estado base del carrito.
// items será un array de productos agregados.
const initialState = {
  items: [],
};

/* ------------------------------------------------ */
/* TIPOS DE ACCIONES DEL REDUCER */
/* ------------------------------------------------ */

// Centralizamos las acciones para evitar strings repetidos
// y facilitar mantenimiento o refactorizaciones.
const CART_ACTIONS = {
  ADD: "ADD_TO_CART",
  REMOVE: "REMOVE_FROM_CART",
  CLEAR: "CLEAR_CART",
  INCREMENT: "INCREMENT_QUANTITY",
  DECREMENT: "DECREMENT_QUANTITY",
};

/* ------------------------------------------------ */
/* REDUCER DEL CARRITO */
/* ------------------------------------------------ */

// El reducer maneja todas las modificaciones del estado
// siguiendo el patrón de Redux.
function cartReducer(state, action) {
  switch (action.type) {

    /* ---------- AGREGAR PRODUCTO ---------- */
    case CART_ACTIONS.ADD: {

      // Verificamos si el producto ya existe en el carrito
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      // Si el producto ya existe, incrementamos la cantidad
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Si el producto no existe, lo agregamos con quantity = 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    /* ---------- ELIMINAR PRODUCTO ---------- */
    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        // Filtramos el producto por id
        items: state.items.filter((item) => item.id !== action.payload),
      };

    /* ---------- AUMENTAR CANTIDAD ---------- */
    case CART_ACTIONS.INCREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    /* ---------- DISMINUIR CANTIDAD ---------- */
    case CART_ACTIONS.DECREMENT:
      return {
        ...state,
        items: state.items
          // Reducimos la cantidad
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          // Eliminamos productos cuya cantidad sea 0
          .filter((item) => item.quantity > 0),
      };

    /* ---------- VACIAR CARRITO ---------- */
    case CART_ACTIONS.CLEAR:
      return initialState;

    /* ---------- ACCIÓN DESCONOCIDA ---------- */
    default:
      return state;
  }
}

/* ------------------------------------------------ */
/* CREACIÓN DEL CONTEXTO */
/* ------------------------------------------------ */

// Creamos el contexto global del carrito
const CartContext = createContext();

/* ------------------------------------------------ */
/* PROVIDER DEL CARRITO */
/* ------------------------------------------------ */

// El Provider envuelve la aplicación y provee el estado del carrito
export function CartProvider({ children }) {

  // useReducer maneja el estado del carrito
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* ---------- ACCIONES DISPONIBLES ---------- */

  // Agregar producto al carrito
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: product });
  };

  // Eliminar producto completamente
  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: id });
  };

  // Incrementar cantidad
  const increment = (id) => {
    dispatch({ type: CART_ACTIONS.INCREMENT, payload: id });
  };

  // Disminuir cantidad
  const decrement = (id) => {
    dispatch({ type: CART_ACTIONS.DECREMENT, payload: id });
  };

  // Vaciar carrito
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR });
  };

  /* ------------------------------------------------ */
  /* VALORES DERIVADOS (OPTIMIZADOS) */
  /* ------------------------------------------------ */

  // Total de productos en el carrito
  // useMemo evita recalcular en cada render
  const totalItems = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  );

  // Precio total del carrito
  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  /* ------------------------------------------------ */
  /* VALOR DEL CONTEXTO */
  /* ------------------------------------------------ */

  // Objeto que será accesible desde cualquier componente
  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalItems,
    totalPrice,
  };

  // Provider que envuelve los componentes hijos
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ------------------------------------------------ */
/* HOOK PERSONALIZADO PARA USAR EL CARRITO */
/* ------------------------------------------------ */

export function useCart() {

  // Consumimos el contexto
  const context = useContext(CartContext);

  // Seguridad: evita usar el hook fuera del Provider
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}