import { client } from "../client";
import { CREATE_CUSTOMER, CUSTOMER_LOGIN } from "@/graphql/mutations";
import {
  CUSTOMER_CREATE_RESPONSE_SCHEMA,
  CUSTOMER_INPUT_SCHEMA,
  CUSTOMER_LOGIN_RESPONSE_SCHEMA,
} from "@/lib/schema/customerSchema";
import {
  CUSTOMER_TYPE,
  CUSTOMER_ACCESS_TOKEN_TYPE,
} from "@/types/customerTypes";
import { API_RESPONSE } from "@/types/responseTypes";
import { normalizeError } from "@/utils/normalizeErrors";

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
    const userErrors = parsed.data.customerCreate?.customerUserErrors?.map(
      (e) => e.message,
    );

    return {
      success: customer ? true : false,
      data: customer ? customer : null,
      errors: userErrors ? userErrors : null,
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

    return {
      success: !!customerToken,
      data: customerToken ? customerToken : null,
      errors: userErrors.length > 0 ? userErrors : null,
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
