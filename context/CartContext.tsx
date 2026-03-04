"use client";
import { addToCartAction } from "@/app/(cart)/addToCart/action";
import { removeItemAction } from "@/app/(cart)/removeItem/action";
import { updateItemAction } from "@/app/(cart)/updateItem/action";
import { CART_TYPE } from "@/types/cartTypes";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useState,
} from "react";

type CART_CONTEXT_TYPE = {
  cart: CART_TYPE | null;
  isOpen: boolean;
  isAdding: boolean;
  toggleCart: () => void;
  setCart: (cart: CART_TYPE) => void;
  addItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateItem: (variantId: string, quantity: string, action: string) => void;
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
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAdding((prev) => !prev);
    const variantId = (e.currentTarget as HTMLButtonElement).dataset
      .variantId as string;
    const formData = new FormData();
    formData.append("variantId", variantId);
    formData.append("quantity", "1");

    const res = await addToCartAction(formData);

    if (!res.success || !res.data) {
      console.error(res.errors);
      return;
    }

    setCart(res.data);
    setTimeout(() => {
      setIsAdding((prev) => !prev);
      setIsOpen((prev) => !prev);
    }, 300);
  };

  const deleteItem = async (id: string) => {
    const formData = new FormData();
    formData.append("line-id", id);

    const res = await removeItemAction(formData);

    if (!res.success || !res.data) {
      console.error(res.errors);
      return;
    }

    setCart(res.data);
  };

  const updateItem = async (id: string, quantity: string, action: string) => {
    const formData = new FormData();
    formData.append("line-id", id);
    let newQuantity = Number(quantity);
    if (action === "desc") {
      newQuantity -= 1;
    } else {
      newQuantity += 1;
    }
    formData.append("quantity", newQuantity.toString());

    const res = await updateItemAction(formData);

    if (!res.success || !res.data) {
      return;
    }

    setCart(res.data);
  };

  const setCart = (cart: CART_TYPE) => {
    dispatch({
      type: "SET_INITIAL_CART",
      payload: cart,
    });
  };

  const toggleCart = () => setIsOpen((prev) => !prev);
  return (
    <CartContext.Provider
      value={{
        cart,
        isAdding,
        isOpen,
        toggleCart,
        setCart,
        deleteItem,
        addItem,
        updateItem,
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
