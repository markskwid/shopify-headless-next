"use server";

import { cookies } from "next/headers";
import { loginCustomer } from "@/lib/shopify/api/customer";
import { API_RESPONSE } from "@/types/response";
import { CUSTOMER_ACCESS_TOKEN_TYPE } from "@/types/customer";
import { normalizeError } from "@/utils/normalizeErrors";
import { updateCartBuyerIdentity } from "@/lib/shopify/api/cart";

export const loginAction = async (
  formData: FormData,
): Promise<API_RESPONSE<CUSTOMER_ACCESS_TOKEN_TYPE>> => {
  try {
    const result = await loginCustomer({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (result.success) {
      const cookieStore = await cookies();
      const { accessToken, expiresAt } = result.data!;

      cookieStore.set("customerAccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(expiresAt),
      });

      let cartId = cookieStore.get("cartId")?.value as string;

      if (cartId) {
        const attachedBuyerToCart = await updateCartBuyerIdentity(
          accessToken,
          cartId,
        );

        if (!attachedBuyerToCart.success) {
          console.log(
            "Error attaching buyer to the cart",
            attachedBuyerToCart.errors,
          );
        }
      }

      return {
        success: true,
        data: result.data,
        errors: null,
      };
    } else {
      return {
        success: false,
        data: null,
        errors: result.errors,
      };
    }
  } catch (err: unknown) {
    console.error("Server action error:", err);

    return {
      success: false,
      data: null,
      errors: normalizeError(err),
    };
  }
};
