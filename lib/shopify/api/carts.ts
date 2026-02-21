import { ADD_TO_CART, CREATE_CART } from "@/graphql/mutations";
import { client } from "../client";
import {
  ADD_TO_CART_RESPONSE_SCHEMA,
  CREATE_CART_RESPONSE_SCHEMA,
  GET_CART_RESPONSE_SCHEMA,
} from "@/lib/schema/cartSchema";
import { cache } from "react";
import { GET_CART } from "@/graphql/queries";
import { normalizeError } from "@/utils/normalizeErrors";
import { API_RESPONSE } from "@/types/responseTypes";
import {
  ADD_TO_CART_LINE_TYPE,
  CART_TYPE,
  CREATED_CART_TYPE,
} from "@/types/cartTypes";

export const getCart = cache(
  async (cartId: string): Promise<API_RESPONSE<CART_TYPE>> => {
    try {
      const { data, errors } = await client.request(GET_CART, {
        variables: {
          cartId,
        },
      });

      if (errors) {
        return {
          success: false,
          data: null,
          errors: normalizeError(errors),
        };
      }

      const parsed = GET_CART_RESPONSE_SCHEMA.safeParse(data);

      if (!parsed.success) {
        console.log("Invalid Data", parsed.error);
        return {
          success: false,
          data: null,
          errors: normalizeError(parsed.error),
        };
      }

      const cart = parsed.data.cart;

      return {
        success: !!cart,
        data: cart ? cart : null,
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
  },
);

export const createCart = async (): Promise<
  API_RESPONSE<CREATED_CART_TYPE>
> => {
  try {
    const { data, errors } = await client.request(CREATE_CART, {
      variables: {
        input: {},
      },
    });

    if (errors) {
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = CREATE_CART_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid Data: ", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const payload = parsed.data;

    if (!payload) {
      console.log("Error creating cart");
      return {
        success: false,
        data: null,
        errors: ["Cart Creation Failed"],
        warnings: null,
      };
    }

    return {
      success: !payload.cartCreate.userErrors?.length,
      data: payload.cartCreate.cart ?? null,
      errors: payload.cartCreate.userErrors?.map((e) => e.message) ?? null,
      warnings: payload.cartCreate.warnings ?? null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(error),
      warnings: null,
    };
  }
};

export const addToCart = async (
  cartId: string,
  input: {
    variantId: string;
    quantity: number;
  },
): Promise<API_RESPONSE<ADD_TO_CART_LINE_TYPE>> => {
  try {
    const { data, errors } = await client.request(ADD_TO_CART, {
      variables: {
        cartId: cartId,
        lines: [
          {
            merchandiseId: input.variantId as string,
            quantity: input.quantity,
          },
        ],
      },
    });

    if (errors) {
      console.log("Graphql error", errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = ADD_TO_CART_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const items = parsed.data.cartLinesAdd.cart;
    const userErrors = parsed.data.cartLinesAdd.userErrors?.map(
      (e) => e.message,
    );
    //if okay return data
    return {
      success: !!items,
      data: items,
      errors: userErrors ? userErrors : null,
      warnings: parsed.data.cartLinesAdd.warnings,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      errors: normalizeError(error),
      warnings: null,
    };
  }
};
