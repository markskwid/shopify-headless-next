import { z } from "zod";
import { PRODUCT_SCHEMA } from "./productSchema";

export const COLLECTION_SCHEMA = z.object({
  title: z.string(),
  description: z.string().nullable(),
  handle: z.string(),
  image: z
    .object({
      altText: z.string().nullable().optional(),
      url: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

//for graphql response -- featured collections
export const COLLECTION_FEATURED_RESPONSE_SCHEMA = z.object({
  metaobjects: z.object({
    nodes: z
      .array(
        z.object({
          fields: z.array(
            z.object({
              key: z.string(),
              references: z.object({
                nodes: z.array(COLLECTION_SCHEMA),
              }),
            }),
          ),
          handle: z.string(),
          id: z.string(),
        }),
      )
      .default([]),
  }),
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
