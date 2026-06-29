"use server";

import { addToCart, createCart } from "@/lib/shopify/api/cart";
import { cookies } from "next/headers";

export const addToCartAction = async (variantId: string, quantity = 1) => {
  try {
    const cookieStore = await cookies();

    let cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      const customerAccessToken = cookieStore.get("customerAccessToken")?.value;

      //create cart + attached
      const newCart = await createCart(customerAccessToken);

      if (!newCart.success || !newCart.data) {
        console.error("Error creating a new cart");
        return {
          success: false,
          data: null,
          errors: newCart.errors,
          warnings: null,
        };
      }

      cartId = newCart.data.id;

      cookieStore.set("cartId", cartId, {
        secure: true,
        sameSite: "lax",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    //add item on cart
    // add to cart function
    const updatedCart = await addToCart(cartId, {
      variantId,
      quantity,
    });

    if (!updatedCart.success) {
      console.error("Error adding new item on cart", updatedCart.errors);

      return {
        success: false,
        data: null,
        errors: updatedCart.errors,
        warnings: null,
      };
    }

    return {
      success: true,
      data: updatedCart.data,
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
