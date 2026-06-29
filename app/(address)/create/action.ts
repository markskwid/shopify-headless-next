"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createCustomerAddress } from "@/lib/shopify/api/address";
import { setDefaultAddressAction } from "../set-default/action";
import { API_RESPONSE } from "@/types/response";
import { ADDRESS_TYPE } from "@/types/address";

export const createAddressAction = async (
  formData: FormData,
): Promise<API_RESPONSE<ADDRESS_TYPE>> => {
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

    const address = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      company: formData.get("company") as string,
      address1: formData.get("addressLine1") as string,
      address2: formData.get("addressLine2") as string,
      country: formData.get("country") as string,
      province: formData.get("province") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
      phone: formData.get("phone") as string,
    };

    const res = await createCustomerAddress(token, address);
    const isDefault = formData.get("defaultAddress") === "true";

    if (!res.success) {
      console.error("There's something wrong in action");
      return {
        success: false,
        data: null,
        errors: res.errors,
      };
    }

    revalidatePath("/account");

    //set to default when checkbox is checked
    if (isDefault) {
      const addressId = res.data?.id as string;
      const setDefaultRes = await setDefaultAddressAction(addressId);

      if (!setDefaultRes.success) {
        console.error("Failed to make the address as default");
        return {
          success: true,
          data: res.data,
          errors: null,
          warnings: [
            {
              message: "Failed to set as default address",
              code: null,
            },
          ],
        };
      }
    }

    //return data even checkbox is not checked
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
