import {
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_UPDATE_NOTE,
} from "@/graphql/mutations";
import { CART_LINES_ADD, CREATE_CART } from "@/graphql/mutations";
import { client } from "../client";
import {
  ADD_TO_CART_RESPONSE_SCHEMA,
  CREATE_CART_RESPONSE_SCHEMA,
  GET_CART_RESPONSE_SCHEMA,
  REMOVE_ITEM_CART_RESPONSE_SCHEMA,
  UPDATE_CART_NOTE_RESPONSE_SCHEMA,
  UPDATE_ITEM_CART_RESPONSE_SCHEMA,
} from "@/lib/schema/cart";
import { GET_CART } from "@/graphql/queries";
import { normalizeError } from "@/utils/normalizeErrors";
import { API_RESPONSE } from "@/types/response";
import { CART_TYPE, CREATED_CART_TYPE } from "@/types/cart";

export const getCart = async (
  cartId: string,
): Promise<API_RESPONSE<CART_TYPE>> => {
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

    if (!cart) {
      console.log("ERRRRORRR");
      return {
        success: false,
        data: null,
        errors: ["Cart not found or expired"],
      };
    }

    return {
      success: true,
      data: cart,
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
  lines: {
    variantId: string;
    quantity: number;
  },
): Promise<API_RESPONSE<CART_TYPE>> => {
  try {
    const { data, errors } = await client.request(CART_LINES_ADD, {
      variables: {
        cartId: cartId,
        lines: [
          {
            merchandiseId: lines.variantId as string,
            quantity: lines.quantity,
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
    const userErrors =
      parsed.data.cartLinesAdd.userErrors?.map((e) => e.message) ?? [];
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

export const removeItemInCart = async (
  cartId: string,
  ids: string[],
): Promise<API_RESPONSE<CART_TYPE>> => {
  try {
    const { data, errors } = await client.request(CART_LINES_REMOVE, {
      variables: {
        cartId: cartId,
        lineIds: ids,
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

    const parsed = REMOVE_ITEM_CART_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const items = parsed.data.cartLinesRemove.cart;
    const userErrors =
      parsed.data.cartLinesRemove.userErrors?.map((e) => e.message) ?? [];
    //if okay return data
    return {
      success: userErrors.length === 0,
      data: items,
      errors: userErrors ? userErrors : null,
      warnings: parsed.data.cartLinesRemove.warnings,
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

export const updateItemInCart = async (
  cartId: string,
  lines: { id: string; quantity: number },
): Promise<API_RESPONSE<CART_TYPE>> => {
  try {
    const { data, errors } = await client.request(CART_LINES_UPDATE, {
      variables: {
        cartId: cartId,
        lines: [lines],
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

    const parsed = UPDATE_ITEM_CART_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const items = parsed.data.cartLinesUpdate.cart;
    const userErrors =
      parsed.data.cartLinesUpdate.userErrors?.map((e) => e.message) ?? [];
    //if okay return data
    return {
      success: userErrors.length === 0,
      data: items,
      errors: userErrors ? userErrors : null,
      warnings: parsed.data.cartLinesUpdate.warnings,
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

export const updateCartNote = async (
  cartId: string,
  note: string,
): Promise<API_RESPONSE<CART_TYPE>> => {
  try {
    const { data, errors } = await client.request(CART_UPDATE_NOTE, {
      variables: {
        cartId: cartId,
        note: note as string,
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

    console.log(data);

    const parsed = UPDATE_CART_NOTE_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const items = parsed.data.cartNoteUpdate.cart;
    const userErrors =
      parsed.data.cartNoteUpdate.userErrors?.map((e) => e.message) ?? [];
    //if okay return data
    return {
      success: userErrors.length === 0,
      data: items,
      errors: userErrors ? userErrors : null,
      warnings: parsed.data.cartNoteUpdate.warnings,
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
