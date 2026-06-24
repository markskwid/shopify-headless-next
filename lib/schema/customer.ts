import { z } from "zod";
import { MONEY_SCHEMA } from "./money";
import { ADDRESS_SCHEMA } from "./address";
import { USER_ERROR_SCHEMA } from "./userErrors";

export const CUSTOMER_INPUT_SCHEMA = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
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

export const CUSTOMER_ADD_ADDRESS_RESPONSE_SCHEMA = z.object({
  customerAddressCreate: z.object({
    customerAddress: ADDRESS_SCHEMA,
    customerUserErrors: USER_ERROR_SCHEMA,
  }),
});

export const CUSTOMER_REMOVE_ADDRESS_RESPONSE_SCHEMA = z.object({
  customerAddressDelete: z.object({
    deletedCustomerAddressId: z.string(),
  }),
  customerUserErrors: USER_ERROR_SCHEMA,
});

export const CUSTOMER_UPDATE_ADDRESS_RESPONSE_SCHEMA = z.object({
  customerAddressUpdate: z.object({
    customerAddress: ADDRESS_SCHEMA,
  }),
  customerUserErrors: USER_ERROR_SCHEMA,
});

export const CUSTOMER_SET_DEFAULT_ADDRESS_RESPONSE_SCHEMA = z.object({
  customerDefaultAddressUpdate: z.object({
    customer: z.object({
      id: z.string(),
      defaultAddress: z.object({
        id: z.string(),
      }),
    }),
  }),
  customerUserErrors: USER_ERROR_SCHEMA,
});
