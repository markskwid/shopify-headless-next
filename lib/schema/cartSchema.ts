import { z } from "zod";
import { MONEY_SCHEMA } from "./moneySchema";

export const CART_SCHEMA = z.object({
  id: z.string(),
  checkoutUrl: z.url(),
  cost: z.object({
    totalAmount: MONEY_SCHEMA,
  }),
  totalQuantity: z.number(),
  lines: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          id: z.string(),
          quantity: z.number(),
          merchandise: z.object({
            image: z.object({
              url: z.string(),
              altText: z.string().nullable().optional(),
            }),
            price: MONEY_SCHEMA,
            sku: z.string().nullable(),
            title: z.string(),
            selectedOptions: z.array(
              z.object({
                title: z.string().optional(),
                value: z.string(),
              }),
            ),
          }),
        }),
      }),
    ),
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

export const ADD_TO_CART_LINE_SCHEMA = z.object({
  id: z.string(),
  totalQuantity: z.number(),
  lines: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        quantity: z.number(),
        cost: z.object({
          totalAmount: MONEY_SCHEMA,
        }),
        merchandise: z.object({
          id: z.string(),
          image: z.object({
            url: z.string(),
            altText: z.string().nullable(),
          }),
          price: MONEY_SCHEMA,
          selectedOptions: z.array(
            z.object({
              value: z.string(),
              name: z.string(),
            }),
          ),
        }),
      }),
    ),
  }),
});

export const ADD_TO_CART_RESPONSE_SCHEMA = z.object({
  cartLinesAdd: z.object({
    cart: ADD_TO_CART_LINE_SCHEMA.nullable(),
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
