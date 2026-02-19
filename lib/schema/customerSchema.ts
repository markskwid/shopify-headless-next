import { z } from "zod";

export const CUSTOMER_INPUT_SCHEMA = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const CUSTOMER_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export const CUSTOMER_CREATE_RESPONSE_SCHEMA = z.object({
  customerCreate: z
    .object({
      customer: CUSTOMER_SCHEMA.nullable(),
      customerUserErrors: z
        .array(
          z.object({
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
    customerAccessToken: z
      .object({
        accessToken: z.string(),
        expiresAt: z.string(),
      })
      .nullable(),
    customerUserErrors: z.array(
      z
        .object({
          field: z.array(z.string()).nullable().optional(),
          message: z.string().nullable().optional(),
        })
        .optional(),
    ),
  }),
});
