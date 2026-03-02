import { z } from "zod";
import { MONEY_SCHEMA } from "./moneySchema";

/**
 * Zod reusable schema
 */

export const VARIANT_SCHEMA = z.object({
  id: z.string(),
  title: z.string(),
  sku: z.string().nullable().optional(),
  availableForSale: z.boolean(),
  image: z
    .object({
      url: z.string(),
    })
    .nullable()
    .optional(),
  price: MONEY_SCHEMA.optional(),
  quantityAvailable: z.number().optional(),
  selectedOptions: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});
