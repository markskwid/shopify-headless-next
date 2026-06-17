import { z } from "zod";
import { MONEY_SCHEMA } from "./money";

export const CUSTOMER_INPUT_SCHEMA = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
});

export const ADDRESS_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  company: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  country: z.string().nullable(),
  zip: z.string().nullable(),
  phone: z.string().nullable(),
});

export const ORDER_SCHEMA = z.object({
  currentTotalPrice: MONEY_SCHEMA,
  subtotalPrice: MONEY_SCHEMA,
  totalShippingPrice: MONEY_SCHEMA,
  totalTax: MONEY_SCHEMA,
  totalPrice: MONEY_SCHEMA,
  discountApplications: z
    .object({
      nodes: z.array(
        z.object({
          applicable: z.boolean(),
          code: z.string(),
          value: z.object({
            percentage: z.number(),
          }),
        }),
      ),
    })
    .optional()
    .nullable(),
  financialStatus: z.string(),
  fulfillmentStatus: z.string(),
  id: z.string(),
  orderNumber: z.number(),
  processedAt: z.string(),
  lineItems: z.object({
    nodes: z.array(
      z.object({
        title: z.string(),
        quantity: z.number(),
        variant: z
          .object({
            image: z.object({
              url: z.string(),
              altText: z.string().nullable(),
            }),
            price: MONEY_SCHEMA,
          })
          .nullable(),
      }),
    ),
  }),
});

export const CUSTOMER_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string(),
  acceptsMarketing: z.boolean().optional(),
  phone: z.string().nullable(),
  addresses: z
    .object({
      nodes: z.array(ADDRESS_SCHEMA),
    })
    .nullable()
    .optional(),
  defaultAddress: ADDRESS_SCHEMA.nullable().optional(),
  orders: z
    .object({
      nodes: z.array(ORDER_SCHEMA),
    })
    .optional()
    .nullable(),
});

export const CUSTOMER_ACCESS_TOKEN_SCHEMA = z.object({
  accessToken: z.string(),
  expiresAt: z.string(),
});

export const CUSTOMER_CREATE_RESPONSE_SCHEMA = z.object({
  customerCreate: z
    .object({
      customer: CUSTOMER_SCHEMA.nullable(),
      customerUserErrors: z
        .array(
          z.object({
            code: z.string(),
            field: z.array(z.string()).nullable().optional(),
            message: z.string(),
          }),
        )
        .nullable()
        .optional(),
    })
    .nullable(),
});

export const CUSTOMER_LOGIN_RESPONSE_SCHEMA = z.object({
  customerAccessTokenCreate: z.object({
    customerAccessToken: CUSTOMER_ACCESS_TOKEN_SCHEMA.nullable(),
    customerUserErrors: z.array(
      z
        .object({
          code: z.string(),
          field: z.array(z.string()).nullable().optional(),
          message: z.string().nullable().optional(),
        })
        .optional(),
    ),
  }),
});

export const GET_CUSTOMER_RESPONSE_SCHEMA = z.object({
  customer: CUSTOMER_SCHEMA,
});
