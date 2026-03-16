"use server";

import { cookies } from "next/headers";
import {
  createCustomer,
  loginCustomer,
} from "./../../../lib/shopify/api/customer";
("use server");

export const registerThenLoginAction = async (formData: FormData) => {
  try {
    const registerResult = await createCustomer({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (registerResult.success) {
      const loginResult = await loginCustomer({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (loginResult.success) {
        const cookieStore = await cookies();
        cookieStore.set("customerAccessToken", loginResult.data?.accessToken!, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          expires: new Date(loginResult.data?.expiresAt!),
        });

        return {
          success: true,
          customerToken: loginResult.data?.accessToken,
          expiresAt: loginResult.data?.expiresAt,
          errors: null,
        };
        
      } else {
        console.log("Error logging in customer");
        return {
          success: false,
          customer: null,
          errors: registerResult.errors,
        };
      }
    }

    //if customer fail on register
    console.log("Error registering customer");
    return {
      success: false,
      customer: null,
      errors: registerResult.errors,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    return {
      success: false,
      customer: null,
      errors: err instanceof Error ? err.message : "Unknown error",
    };
  }
};
