import { z } from "zod";
import { MONEY_SCHEMA } from "./money";

export const VARIANT_SCHEMA = z.object({
  id: z.string(),
  title: z.string(),
  sku: z.string().nullable().optional(),
  availableForSale: z.boolean(),
  quantityAvaiable: z.number().optional().nullable(),
  currentlyNotInStock: z.boolean().optional().nullable(),
  image: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .nullable()
    .optional(),
  price: MONEY_SCHEMA.optional(),
  selectedOptions: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});
