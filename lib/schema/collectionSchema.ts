import { z } from "zod";
import { PRODUCT_SCHEMA, PRODUCTS_CONNECTION_SCHEMA } from "./productSchema";

export const COLLECTION_SCHEMA = z.object({
  title: z.string(),
  description: z.string(),
  handle: z.string(),
  image: z
    .object({
      altText: z.string(),
      url: z.string(),
    })
    .nullable()
    .optional(),
});

//for graphql response -- listing
export const COLLECTION_CONNECTION_SCHEMA = z.object({
  edges: z.array(z.object({ node: COLLECTION_SCHEMA })),
  pageInfo: z.object({
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
    endCursor: z.string().nullable().optional(),
  }),
});

export const COLLECTION_DETAIL_SCHEMA = COLLECTION_SCHEMA.extend({
  products: z.object({
    nodes: z.array(PRODUCT_SCHEMA),
  }),
});
