import { z } from "zod";
import {
  PRODUCT_SCHEMA,
  PRODUCT_LISTING_RESPONSE_SCHEMA,
} from "./productSchema";

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
export const COLLECTION_LISTING_RESPONSE_SCHEMA = z.object({
  collections: z.object({
    edges: z.array(z.object({ node: COLLECTION_SCHEMA })),
    pageInfo: z.object({
      hasPreviousPage: z.boolean(),
      hasNextPage: z.boolean(),
      endCursor: z.string().nullable().optional(),
    }),
  }),
});

//collection page data
export const COLLECTION_DETAIL_SCHEMA = COLLECTION_SCHEMA.extend({
  products: z.object({
    nodes: z.array(PRODUCT_SCHEMA),
  }),
}).nullable();

export const COLLECTION_DETAIL_RESPONSE_SCHEMA = z.object({
  collection: COLLECTION_DETAIL_SCHEMA,
});
