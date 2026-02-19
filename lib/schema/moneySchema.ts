import { z } from "zod";

/**
 * Zod reusable schema
 */

export const MONEY_SCHEMA = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});
