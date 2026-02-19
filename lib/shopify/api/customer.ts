import { z } from "zod";
import { client } from "../client";
import { CREATE_CUSTOMER } from "@/graphql/mutations";

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

export const createCustomer = async (input: unknown) => {
  //validate user input
  const parsedInput = CUSTOMER_INPUT_SCHEMA.safeParse(input);

  if (!parsedInput.success) {
    console.log("Invalid customer input", parsedInput.error);
    return { success: false, errors: parsedInput.error.format() };
  }

  const { data, errors } = await client.request(CREATE_CUSTOMER, {
    variables: {
      input: parsedInput.data,
    },
  });

  if (Array.isArray(errors) && errors.length > 0) {
    console.log("Graphql Errors", errors);
    return { success: false, errors };
  }

  return { success: true, data };
};
