"use server";
import { updateCartNote } from "@/lib/shopify/api/cart";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateCartNoteAction = async (note: string) => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      console.error("Cart not exists");
      return {
        success: false,
        errors: ["Cart ID not found"],
        data: null,
      };
    }

    const result = await updateCartNote(cartId, note);

    if (!result.success) {
      console.error("Error updating cart note", result.errors);

      return {
        success: false,
        data: null,
        errors: result.errors,
      };
    }

    revalidatePath("/cart")

    return {
      data: result.data,
      success: true,
      errors: result.errors,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    return {
      success: false,
      errors: err instanceof Error ? [err.message] : ["Unknown Error"],
      data: null,
    };
  }
};
