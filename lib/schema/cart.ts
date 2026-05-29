import { z } from "zod";
import { MONEY_SCHEMA } from "./money";

export const CART_LINE_SCHEMA = z.object({
  id: z.string(),
  quantity: z.number(),
  cost: z.object({
    totalAmount: MONEY_SCHEMA,
  }),
  merchandise: z.object({
    image: z.object({
      url: z.string(),
      altText: z.string().nullable().optional(),
    }),
    product: z.object({
      title: z.string(),
      handle: z.string(),
    }),
    price: MONEY_SCHEMA,
    sku: z.string().nullable(),
    title: z.string(),
    selectedOptions: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    ),
  }),
});

export const CART_SCHEMA = z.object({
  id: z.string(),
  checkoutUrl: z.string(),
  totalQuantity: z.number(),
  discountCodes: z.array(
    z.object({
      code: z.string(),
      applicable: z.boolean(),
    }),
  ),
  cost: z.object({
    subtotalAmount: MONEY_SCHEMA.nullable(),
    totalTaxAmount: MONEY_SCHEMA.nullable(),
    totalAmount: MONEY_SCHEMA.nullable(),
  }),
  lines: z.object({
    nodes: z.array(CART_LINE_SCHEMA),
  }),
});

export const GET_CART_RESPONSE_SCHEMA = z.object({
  cart: CART_SCHEMA,
});

export const CREATED_CART_SCHEMA = z.object({
  id: z.string(),
  totalQuantity: z.number(),
  checkoutUrl: z.url(),
});

export const CREATE_CART_RESPONSE_SCHEMA = z.object({
  cartCreate: z.object({
    cart: CREATED_CART_SCHEMA,
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()).optional().nullable(),
          message: z.string(),
        }),
      )
      .nullable(),
    warnings: z
      .array(
        z.object({
          message: z.string(),
          code: z.string(),
        }),
      )
      .nullable(),
  }),
});

export const ADD_TO_CART_RESPONSE_SCHEMA = z.object({
  cartLinesAdd: z.object({
    cart: CART_SCHEMA.nullable(),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
    warnings: z
      .array(
        z.object({
          code: z.string(),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
});

//cart lines remove
export const REMOVE_ITEM_CART_RESPONSE_SCHEMA = z.object({
  cartLinesRemove: z.object({
    cart: CART_SCHEMA.nullable(),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
    warnings: z
      .array(
        z.object({
          code: z.string(),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
});

//cart lines update
export const UPDATE_ITEM_CART_RESPONSE_SCHEMA = z.object({
  cartLinesUpdate: z.object({
    cart: CART_SCHEMA.nullable(),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
    warnings: z
      .array(
        z.object({
          code: z.string(),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
});

//cart update note
export const UPDATE_CART_NOTE_RESPONSE_SCHEMA = z.object({
  cartNoteUpdate: z.object({
    cart: CART_SCHEMA.nullable(),
    userErrors: z
      .array(
        z.object({
          field: z.array(z.string()),
          message: z.string(),
        }),
      )
      .nullable(),
    warnings: z
      .array(
        z.object({
          code: z.string(),
          message: z.string(),
        }),
      )
      .nullable(),
  }),
});

//discount code cart
export const CART_DISCOUNT_APPLIED_RETURN_SCHEMA = z.object({
  cartDiscountCodesUpdate: z.object({
    cart: z.object({
      discountCodes: z.array(
        z.object({
          code: z.string(),
          applicable: z.boolean(),
        }),
      ),
      cost: z.object({
        subtotalAmount: MONEY_SCHEMA,
        totalAmount: MONEY_SCHEMA,
      }),

      userErrors: z.array(z.object()).nullable().optional(),
    }),
  }),
});
