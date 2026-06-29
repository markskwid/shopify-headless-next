import { z } from "zod";
import { PRODUCT_SCHEMA, PRODUCT_SEARCH_SCHEMA } from "@/lib/schema/product";

export const PREDICTIVE_SEARCH_RESULT_SCHEMA = z.object({
  predictiveSearch: z.object({
    products: z.array(PRODUCT_SEARCH_SCHEMA),
  }),
});

export const SEARCH_RESULT_PAGE_SCHEMA = z.object({
  search: z.object({
    totalCount: z.number(),
    edges: z.array(
      z.object({
        node: PRODUCT_SCHEMA,
      }),
    ),
    pageInfo: z
      .object({
        hasNextPage: z.boolean(),
        endCursor: z.string().nullable(),
      })
      .optional(),
  }),
});
