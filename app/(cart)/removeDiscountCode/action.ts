"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { applyDiscountCode } from "@/lib/shopify/api/cart";

export const removeDiscountCodeAction = async () => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return {
        success: false,
        data: null,
        errors: ["No cart found"],
      };
    }

    const result = await applyDiscountCode(cartId, "");

    if (!result.success || !result.data) {
      return {
        success: false,
        data: null,
        errors: result.errors,
      };
    }

    revalidatePath("/cart");

    return {
      success: true,
      data: result.data,
      errors: null,
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
