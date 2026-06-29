"use client";
import { addToCartAction } from "@/app/(cart)/addToCart/action";
import { removeItemAction } from "@/app/(cart)/removeItem/action";
import { updateItemAction } from "@/app/(cart)/updateItem/action";
import { CART_TYPE } from "@/types/cart";
import { createContext, useContext, ReactNode, useState } from "react";
import { useUI } from "./UserInterface";

type CART_CONTEXT_TYPE = {
  cart: CART_TYPE | null;
  addingVariant: string | null;
  updatingVariant: string | null;
  setCart: (cart: CART_TYPE) => void;
  addItem: (id: string, quantity?: number) => Promise<boolean>;
  updateItem: (
    variantId: string,
    quantity: string,
    action: "inc" | "dec",
  ) => void;
  deleteItem: (id: string) => void;
};

const CartContext = createContext<CART_CONTEXT_TYPE | undefined>(undefined);

interface CART_PROVIDER_PROPS {
  children: ReactNode;
  initialCart: CART_TYPE | null;
}

export const CartProvider = ({
  initialCart,
  children,
}: CART_PROVIDER_PROPS) => {
  const [cart, setCartState] = useState<CART_TYPE | null>(initialCart);
  const [addingVariant, setAddingVariant] = useState<string | null>(null);
  const [updatingVariant, setUpdatingVariant] = useState<string | null>(null);

  const { toggleCart } = useUI();

  const addItem = async (id: string, quantity?: number) => {
    try {
      setAddingVariant(id);
      const formData = new FormData();
      formData.append("variantId", id);
      formData.append("quantity", quantity ? quantity.toString() : "1");

      const res = await addToCartAction(formData);

      if (!res.success || !res.data) {
        console.error(res.errors);
        return false;
      }
      setCart(res.data);
      toggleCart();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setAddingVariant(null);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("line-id", id);

      const res = await removeItemAction(formData);

      if (!res.success || !res.data) {
        console.error(res.errors);
        return;
      }

      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (
    id: string,
    quantity: string,
    action: "inc" | "dec",
  ) => {
    try {
      setUpdatingVariant(id);
      const formData = new FormData();
      formData.append("line-id", id);
      let newQuantity = Number(quantity);
      if (action === "dec") {
        newQuantity -= 1;
      } else {
        newQuantity += 1;
      }
      formData.append("quantity", newQuantity.toString());

      const res = await updateItemAction(formData);

      if (res.success && res.data) setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingVariant(null);
    }
  };

  const setCart = (cart: CART_TYPE) => {
    setCartState(cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addingVariant,
        setCart,
        deleteItem,
        addItem,
        updateItem,
        updatingVariant,
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
