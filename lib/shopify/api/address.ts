import "server-only";

import { normalizeError } from "@/utils/normalizeErrors";
import { client } from "../client";
import {
  CUSTOMER_CREATE_ADDRESS,
  CUSTOMER_EDIT_ADDRESS,
  CUSTOMER_SET_DEFAULT_ADDRESS,
} from "@/graphql/mutations";

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
) => {
  try {
    const { data, errors } = await client.request(CUSTOMER_EDIT_ADDRESS, {
      variables: {
        customerAccessToken: token,
        id: addressId,
        address,
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    return {
      success: true,
      data: data,
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
) => {
  try {
    const { data, errors } = await client.request(CUSTOMER_CREATE_ADDRESS, {
      variables: {
        customerAccessToken: token,
        address,
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    return {
      success: true,
      data: data,
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
) => {
  try {
    const { data, errors } = await client.request(CUSTOMER_SET_DEFAULT_ADDRESS, {
      variables: {
        customerAccessToken: token,
        addressId,
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    return {
      success: true,
      data: data,
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
