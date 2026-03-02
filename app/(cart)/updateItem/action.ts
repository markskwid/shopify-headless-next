"use server";
import { updateItemInCart } from "@/lib/shopify/api/carts";
import { cookies } from "next/headers";

export const updateItemAction = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      console.log("Cart not exists");
      return {
        success: false,
        errors: ["Cart ID not found"],
        data: null,
      };
    }

    const lineId = formData.get("line-id") as string;
    const newQuantity = Number(formData.get("quantity"));

    const result = await updateItemInCart(cartId, {
      id: lineId,
      quantity: newQuantity,
    });

    if (!result.success) {
      console.log("Error removing item", result.errors);

      return {
        success: false,
        data: null,
        errors: result.errors,
      };
    }

    return {
      data: result.data,
      success: true,
      errors: result.errors,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    return {
      success: false,
      errors: err instanceof Error ? [err.message] : ["Unknown Error"],
      data: null,
    };
  }
};
