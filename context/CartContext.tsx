"use client";
import { CART_TYPE } from "@/types/cartTypes";
import { createContext, useContext, ReactNode, useReducer } from "react";

type CART_CONTEXT_TYPE = {
  cart: CART_TYPE | null;
  setCart: (cart: CART_TYPE) => void;
  addItem: (variantId: string, quantity: number) => void;
  deleteItem: (id: string) => void;
};

type CART_ACTION =
  | { type: "SET_INITIAL_CART"; payload: CART_TYPE }
  | { type: "ADD_ITEM"; payload: CART_TYPE }
  | { type: "REMOVE_ITEM"; payload: string };

const CartContext = createContext<CART_CONTEXT_TYPE | undefined>(undefined);

const CART_REDUCER = (state: CART_TYPE, action: CART_ACTION): CART_TYPE => {
  switch (action.type) {
    case "SET_INITIAL_CART":
      return action.payload;
    case "ADD_ITEM":
      return state;
    case "REMOVE_ITEM":
      return state;
    default:
      return state;
  }
};

interface CART_PROVIDER_PROPS {
  children: ReactNode;
  initialCart: CART_TYPE;
}

export const CartProvider = ({
  initialCart,
  children,
}: CART_PROVIDER_PROPS) => {
  const [cart, dispatch] = useReducer(CART_REDUCER, initialCart);

  const addItem = (id: string, quantity: number) => {};
  const deleteItem = (id: string) => {};

  const setCart = (cart: CART_TYPE) => {
    dispatch({
      type: "SET_INITIAL_CART",
      payload: cart,
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        deleteItem,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
