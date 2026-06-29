"use server";

import { cookies } from "next/headers";
import { createCustomer, loginCustomer } from "@/lib/shopify/api/customer";
import { API_RESPONSE } from "@/types/response";
import { CUSTOMER_ACCESS_TOKEN_TYPE } from "@/types/customer";
import { normalizeError } from "@/utils/normalizeErrors";
import { createCart, updateCartBuyerIdentity } from "@/lib/shopify/api/cart";

export const registerThenLoginAction = async (
  formData: FormData,
): Promise<API_RESPONSE<CUSTOMER_ACCESS_TOKEN_TYPE>> => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const registerResult = await createCustomer({
      firstName,
      lastName,
      email,
      password,
    });

    if (!registerResult.success) {
      return {
        success: false,
        data: null,
        errors: registerResult.errors,
      };
    }

    const loginResult = await loginCustomer({
      email,
      password,
    });

    if (!loginResult.success) {
      return {
        success: false,
        data: null,
        errors: loginResult.errors,
      };
    }

    const { accessToken, expiresAt } = loginResult.data!;

    //save token on cookies
    const cookieStore = await cookies();
    cookieStore.set("customerAccessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(expiresAt),
    });

    return {
      success: true,
      data: loginResult.data,
      errors: null,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(err),
    };
  }
};
