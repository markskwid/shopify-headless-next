"use server";

import { cookies } from "next/headers";
import { normalizeError } from "@/utils/normalizeErrors";
import { revalidatePath } from "next/cache";
import { logoutCustomer } from "@/lib/shopify/api/customer";
import { updateCartBuyerIdentity } from "@/lib/shopify/api/cart";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("customerAccessToken")?.value;
    const cartId = cookieStore.get("cartId")?.value;

    if (token) {
      await logoutCustomer(token);
    }

    if (cartId) {
      await updateCartBuyerIdentity(null, cartId);
    }

    cookieStore.delete("customerAccessToken");
    revalidatePath("/account");

    return {
      success: true,
      errors: null,
    };
  } catch (err: unknown) {
    console.error("Server action error:", err);

    return {
      success: false,
      data: null,
      errors: normalizeError(err),
    };
  }
};
