"use server";

import { cookies } from "next/headers";
import { loginCustomer } from "@/lib/shopify/api/customer";

export const loginAction = async (formData: FormData) => {
  try {
    const result = await loginCustomer({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (result.success) {
      const cookieStore = await cookies();
      cookieStore.set("customerAccessToken", result.data?.accessToken!, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(result.data?.expiresAt!),
      });

      return {
        success: true,
        customerToken: result.data?.accessToken,
        expiresAt: result.data?.expiresAt,
        errors: null,
      };
    }
  } catch (err: unknown) {
    console.error("Server action error:", err);

    return {
      success: false,
      customerToken: null,
      expiresAt: null,
      errors: err instanceof Error ? err.message : "Unknown error",
    };
  }
};
