import { z } from "zod";
import { MONEY_SCHEMA } from "./moneySchema";
import { VARIANT_SCHEMA } from "./variantSchema";

//schema for product listing
export const PRODUCT_SCHEMA = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  vendor: z.string().optional().nullable(),
  totalInventory: z.number().optional().nullable(),
  featuredImage: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .optional()
    .nullable(),
  priceRange: z.object({
    minVariantPrice: MONEY_SCHEMA,
    maxVariantPrice: MONEY_SCHEMA,
  }),

  compareAtPriceRange: z
    .object({
      minVariantPrice: MONEY_SCHEMA,
      maxVariantPrice: MONEY_SCHEMA,
    })
    .optional()
    .nullable(),
});

// connection for graphql response
export const PRODUCTS_CONNECTION_SCHEMA = z.object({
  edges: z.array(z.object({ node: PRODUCT_SCHEMA })),
  pageInfo: z.object({
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
    endCursor: z.string().nullable().optional(),
  }),
});

//schema for product page - pdp
export const PRODUCT_DETAIL_SCHEMA = PRODUCT_SCHEMA.extend({
  variants: VARIANT_SCHEMA,
});
