import { CUSTOMER_SET_DEFAULT_ADDRESS_RESPONSE_SCHEMA } from "./../../schema/customer";
import "server-only";

import { normalizeError } from "@/utils/normalizeErrors";
import { client } from "../client";
import {
  CUSTOMER_CREATE_ADDRESS,
  CUSTOMER_DELETE_ADDRESS,
  CUSTOMER_EDIT_ADDRESS,
  CUSTOMER_SET_DEFAULT_ADDRESS,
} from "@/graphql/mutations";
import {
  CUSTOMER_ADD_ADDRESS_RESPONSE_SCHEMA,
  CUSTOMER_REMOVE_ADDRESS_RESPONSE_SCHEMA,
  CUSTOMER_UPDATE_ADDRESS_RESPONSE_SCHEMA,
} from "@/lib/schema/customer";
import { API_RESPONSE } from "@/types/response";
import { ADDRESS_TYPE } from "@/types/address";

export const updateCustomerAddress = async (
  token: string,
  addressId: string,
  address: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  },
): Promise<API_RESPONSE<ADDRESS_TYPE>> => {
  try {
    const { data, errors } = await client.request(CUSTOMER_EDIT_ADDRESS, {
      variables: {
        customerAccessToken: token,
        id: addressId,
        address,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_UPDATE_ADDRESS_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error Validation");
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const userErrors = parsed.data.customerUserErrors ?? [];

    if (userErrors.length > 0) {
      console.error("User error");
      return {
        success: false,
        data: null,
        errors: normalizeError(userErrors),
      };
    }

    const addressData = parsed.data.customerAddressUpdate.customerAddress;

    return {
      success: true,
      data: addressData,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

export const createCustomerAddress = async (
  token: string,
  address: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  },
): Promise<API_RESPONSE<ADDRESS_TYPE>> => {
  try {
    const { data, errors } = await client.request(CUSTOMER_CREATE_ADDRESS, {
      variables: {
        customerAccessToken: token,
        address,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_ADD_ADDRESS_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error Validation");
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const userErrors =
      parsed.data.customerAddressCreate.customerUserErrors ?? [];

    if (userErrors.length > 0) {
      console.error("User error");
      return {
        success: false,
        data: null,
        errors: normalizeError(userErrors),
      };
    }

    const addressData = parsed.data.customerAddressCreate.customerAddress;

    return {
      success: true,
      data: addressData,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

export const setDefaultCustomerAddress = async (
  token: string,
  addressId: string,
): Promise<API_RESPONSE<string>> => {
  try {
    const { data, errors } = await client.request(
      CUSTOMER_SET_DEFAULT_ADDRESS,
      {
        variables: {
          customerAccessToken: token,
          addressId,
        },
      },
    );

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_SET_DEFAULT_ADDRESS_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error Validation");
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const userErrors = parsed.data.customerUserErrors ?? [];

    if (userErrors.length > 0) {
      console.error("User error");
      return {
        success: false,
        data: null,
        errors: normalizeError(userErrors),
      };
    }

    return {
      success: true,
      data: parsed.data.customerDefaultAddressUpdate.customer.defaultAddress.id,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

export const removeCustomerAddress = async (
  token: string,
  addressId: string,
): Promise<API_RESPONSE<string>> => {
  try {
    const { data, errors } = await client.request(CUSTOMER_DELETE_ADDRESS, {
      variables: {
        customerAccessToken: token,
        id: addressId,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_REMOVE_ADDRESS_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error Validation");
      return {
        success: false,
        errors: normalizeError(parsed.error),
        data: null,
      };
    }

    const userErrors = parsed.data.customerUserErrors ?? [];

    if (userErrors.length > 0) {
      console.error("User Error");
      return {
        success: false,
        data: null,
        errors: normalizeError(userErrors),
      };
    }

    const addressData =
      parsed.data.customerAddressDelete.deletedCustomerAddressId;

    return {
      success: true,
      data: addressData,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};
