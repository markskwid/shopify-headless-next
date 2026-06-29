import "server-only";
import { client } from "../client";
import {
  CREATE_CUSTOMER,
  CUSTOMER_LOGIN,
  CUSTOMER_LOGOUT,
} from "@/graphql/mutations";
import {
  CUSTOMER_CREATE_RESPONSE_SCHEMA,
  CUSTOMER_INPUT_SCHEMA,
  CUSTOMER_LOGIN_RESPONSE_SCHEMA,
  CUSTOMER_LOGOUT_RESPONSE_SCHEMA,
  GET_CUSTOMER_RESPONSE_SCHEMA,
} from "@/lib/schema/customer";
import { CUSTOMER_TYPE, CUSTOMER_ACCESS_TOKEN_TYPE } from "@/types/customer";
import { API_RESPONSE } from "@/types/response";
import { normalizeError } from "@/utils/normalizeErrors";
import { GET_CUSTOMER_INFO } from "@/graphql/queries";

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
      console.error("Invalid customer input", parsedInput.error);
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
      console.error("Graphql Errors", errors.graphQLErrors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_CREATE_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Invalid data", parsed.error);
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

    if (userErrors?.length > 0 || !customer) {
      return {
        success: false,
        data: null,
        errors:
          userErrors.length > 0
            ? normalizeError(userErrors)
            : ["Unknown Error"],
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
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_LOGIN_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Invalid data", parsed.error);
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
  
    if (userErrors.length > 0 || !customerToken) {
      return {
        success: false,
        data: null,
        errors: userErrors.length > 0 ? normalizeError(userErrors) : ["Unknown Error"],
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

export const logoutCustomer = async (
  token: string,
): Promise<API_RESPONSE<string>> => {
  try {
    const { data, errors } = await client.request(CUSTOMER_LOGOUT, {
      variables: {
        customerAccessToken: token,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors.graphQLErrors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = CUSTOMER_LOGOUT_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Validation Error");
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const userErrors = parsed.data.customerAccessTokenDelete.userErrors
      ?.map((e) => e?.message)
      .filter((msg): msg is string => !!msg);

    if (userErrors && userErrors.length > 0) {
      console.error("User error");
      return {
        success: false,
        data: null,
        errors:
          userErrors.length > 0
            ? normalizeError(userErrors)
            : ["User errors on logout"],
      };
    }

    return {
      success: true,
      data: parsed.data.customerAccessTokenDelete.deletedAccessToken,
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
      console.error("Graphql error");
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = GET_CUSTOMER_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Validation Error");
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
