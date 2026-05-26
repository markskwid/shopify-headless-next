import { z } from "zod";

export const FILTER_SCHEMA = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  values: z.array(
    z.object({
      count: z.number(),
      id: z.string(),
      input: z.string(),
      label: z.string(),
    }),
  ),
});

export const FILTER_RESPONSE_SCHEMA = z.object({
  collection: z.object({
    products: z.object({
      filters: z.array(FILTER_SCHEMA),
    }),
  }),
});
