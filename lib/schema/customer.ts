import { z } from "zod";

export const CUSTOMER_INPUT_SCHEMA = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
});

export const CUSTOMER_SCHEMA = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  acceptsMarketing: z.boolean().optional(),
  phone: z.string().optional(),
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
