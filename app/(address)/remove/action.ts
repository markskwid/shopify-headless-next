"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { removeCustomerAddress } from "@/lib/shopify/api/address";
import { API_RESPONSE } from "@/types/response";

export const removeAddressAction = async (addressId: string) : Promise<API_RESPONSE<string>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("customerAccessToken")?.value;

    if (!token) {
      return {
        success: false,
        data: null,
        errors: ["Not Authenticated!"],
      };
    }

    const res = await removeCustomerAddress(token, addressId);

    if (!res.success) {
      console.error("There's something wrong in action");
      return {
        success: false,
        data: null,
        errors: res.errors,
      };
    }

    revalidatePath("/account");

    return {
      success: true,
      data: res.data,
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
