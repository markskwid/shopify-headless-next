"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { applyDiscountCode } from "@/lib/shopify/api/cart";

export const applyDiscountAction = async (code: string) => {
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

    if (!code) {
      return {
        success: false,
        data: null,
        errors: ["No code provided"],
      };
    }

    const result = await applyDiscountCode(cartId, code);

    if (!result.success || !result.data) {
      return {
        success: false,
        data: null,
        errors: result.errors,
      };
    }

    const isApplicable = result.data.discountCodes?.[0]?.applicable;

    if (!isApplicable) {
      return {
        success: false,
        data: null,
        errors: ["Invalid or expired discount code"],
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
