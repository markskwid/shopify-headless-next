import { z } from "zod";
import { MONEY_SCHEMA } from "./moneySchema";

/**
 * Zod reusable schema
 */

export const VARIANT_SCHEMA = z.object({
  nodes: z.array(
    z.object({
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
      price: MONEY_SCHEMA,
      quantityAvailable: z.number(),
      selectedOptions: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
});
