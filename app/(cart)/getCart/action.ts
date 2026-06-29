"use server";

import { getCart } from "@/lib/shopify/api/cart";
import { cookies } from "next/headers";

export const getCartAction = async () => {
  try {
    let cookieStore = await cookies();
    let cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return {
        success: false,
        data: null,
        errors: ["No cart id"],
        warnings: null,
      };
    }

    let cart = await getCart(cartId);

    if (!cart.success || !cart.data) {
      cookieStore.delete("cartId");

      return {
        success: false,
        data: null,
        errors: cart.errors,
        warnings: null,
      };
    }

    const cartData = cart.data;

    return {
      success: true,
      data: cartData,
      errors: null,
      warnings: null,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    return {
      success: false,
      data: null,
      errors: err instanceof Error ? [err.message] : ["Unknown error"],
      warnings: null,
    };
  }
};
