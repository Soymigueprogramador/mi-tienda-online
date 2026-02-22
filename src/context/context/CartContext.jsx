import { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
  items: [],
};

const CART_ACTIONS = {
  ADD: "ADD_TO_CART",
  REMOVE: "REMOVE_FROM_CART",
  CLEAR: "CLEAR_CART",
  INCREMENT: "INCREMENT_QUANTITY",
  DECREMENT: "DECREMENT_QUANTITY",
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

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

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CART_ACTIONS.INCREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case CART_ACTIONS.DECREMENT:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case CART_ACTIONS.CLEAR:
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: id });
  };

  const increment = (id) => {
    dispatch({ type: CART_ACTIONS.INCREMENT, payload: id });
  };

  const decrement = (id) => {
    dispatch({ type: CART_ACTIONS.DECREMENT, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR });
  };

  const totalItems = useMemo(
    () => state.items.reduce((acc, item) => acc + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [state.items]
  );

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}