import "server-only";
import { client } from "../client";
import { CREATE_CUSTOMER, CUSTOMER_LOGIN } from "@/graphql/mutations";
import {
  CUSTOMER_CREATE_RESPONSE_SCHEMA,
  CUSTOMER_INPUT_SCHEMA,
  CUSTOMER_LOGIN_RESPONSE_SCHEMA,
  GET_CUSTOMER_RESPONSE_SCHEMA,
} from "@/lib/schema/customer";
import { CUSTOMER_TYPE, CUSTOMER_ACCESS_TOKEN_TYPE } from "@/types/customer";
import { API_RESPONSE } from "@/types/response";
import { normalizeError } from "@/utils/normalizeErrors";
import { GET_CUSTOMER_INFO } from "@/graphql/queries";
import { no } from "zod/locales";

export const createCustomer = async (input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<API_RESPONSE<CUSTOMER_TYPE>> => {
  try {
    //validate user input
    const parsedInput = CUSTOMER_INPUT_SCHEMA.safeParse(input);

    if (!parsedInput.success) {
      console.log("Invalid customer input", parsedInput.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsedInput.error.format()),
      };
    }

    const { data, errors } = await client.request(CREATE_CUSTOMER, {
      variables: {
        input: parsedInput.data,
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors.graphQLErrors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_CREATE_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const customer = parsed.data.customerCreate?.customer ?? null;
    const userErrors =
      parsed.data.customerCreate?.customerUserErrors?.map((e) => e.message) ??
      [];
    const userErrorCodes = parsed.data.customerCreate?.customerUserErrors
      ?.map((e) => e?.code)
      .filter((code): code is string => Boolean(code));

    if (userErrors?.length > 0 || !customer) {
      return {
        success: false,
        data: null,
        errors: userErrorCodes ?? ["Unknown Error"],
      };
    }

    return {
      success: true,
      data: customer,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(error),
    };
  }
};

export const loginCustomer = async (input: {
  email: string;
  password: string;
}): Promise<API_RESPONSE<CUSTOMER_ACCESS_TOKEN_TYPE>> => {
  try {
    const { data, errors } = await client.request(CUSTOMER_LOGIN, {
      variables: {
        input,
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_LOGIN_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const customerToken =
      parsed.data?.customerAccessTokenCreate.customerAccessToken;
    const userErrors = parsed.data.customerAccessTokenCreate.customerUserErrors
      .map((e) => e?.message)
      .filter((msg): msg is string => !!msg);
    const userErrorCodes =
      parsed.data.customerAccessTokenCreate.customerUserErrors
        .map((e) => e?.code)
        .filter((code): code is string => Boolean(code));

    if (userErrors.length > 0 || !customerToken) {
      return {
        success: false,
        data: null,
        errors: userErrorCodes,
      };
    }

    return {
      success: true,
      data: customerToken,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(error),
    };
  }
};

export const getCustomer = async (
  token: string,
): Promise<API_RESPONSE<CUSTOMER_TYPE>> => {
  try {
    const { data, errors } = await client.request(GET_CUSTOMER_INFO, {
      variables: {
        token,
      },
    });

    if (errors) {
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = GET_CUSTOMER_RESPONSE_SCHEMA.safeParse(data);

    console.log(parsed.data);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const customerData: CUSTOMER_TYPE = parsed.data.customer;

    return {
      success: true,
      data: customerData,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(error),
    };
  }
};
