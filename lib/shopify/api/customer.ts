import { custom, success, z } from "zod";
import { client } from "../client";
import { CREATE_CUSTOMER, CUSTOMER_LOGIN } from "@/graphql/mutations";
import {
  CUSTOMER_CREATE_RESPONSE_SCHEMA,
  CUSTOMER_INPUT_SCHEMA,
  CUSTOMER_LOGIN_RESPONSE_SCHEMA,
} from "@/lib/schema/customerSchema";

export const createCustomer = async (input: unknown) => {
  try {
    //validate user input
    const parsedInput = CUSTOMER_INPUT_SCHEMA.safeParse(input);

    if (!parsedInput.success) {
      console.log("Invalid customer input", parsedInput.error);
      return { success: false, errors: parsedInput.error.format() };
    }

    const { data, errors } = await client.request(CREATE_CUSTOMER, {
      variables: {
        input: parsedInput.data,
      },
    });

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        customer: null,
        errors,
      };
    }

    const parsed = CUSTOMER_CREATE_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        customer: null,
        errors: parsed.error,
      };
    }

    const customer = parsed.data.customerCreate?.customer ?? null;

    return {
      success: customer ? true : false,
      customer,
      errors: customer ? null : parsed.data.customerCreate?.customerUserErrors,
    };
  } catch (error: unknown) {
    let formattedError: unknown = error;

    if (error instanceof Error) {
      console.error(error.message);
      formattedError = error.message;
    }

    return {
      success: false,
      customer: null,
      errors: formattedError,
    };
  }
};

export const loginCustomer = async (input: unknown) => {
  try {
    const { data, errors } = await client.request(CUSTOMER_LOGIN, {
      variables: {
        input,
      },
    });

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        customerToken: null,
        expiresAt: null,
        errors,
      };
    }

    const parsed = CUSTOMER_LOGIN_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        customerToken: null,
        expiresAt: null,
        errors: parsed.error,
      };
    }

    const customerToken =
      parsed.data?.customerAccessTokenCreate.customerAccessToken;

    return {
      success: !!customerToken,
      customerToken: customerToken ? customerToken.accessToken : null,
      expiresAt: customerToken ? customerToken.expiresAt : null,
      errors: customerToken
        ? null
        : parsed.data?.customerAccessTokenCreate.customerUserErrors,
    };
  } catch (error: unknown) {
    let formattedError: unknown = error;
    if (error instanceof Error) {
      console.error(error.message);
      formattedError = error.message;
    }

    return {
      success: false,
      customerAccessToken: null,
      expiresAt: null,
      errors: formattedError,
    };
  }
};
