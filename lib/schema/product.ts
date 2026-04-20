import { z } from "zod";
import { MONEY_SCHEMA } from "./money";
import { VARIANT_SCHEMA } from "./variant";

//schema for product listing
export const PRODUCT_SCHEMA = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  vendor: z.string().optional().nullable(),
  totalInventory: z.number().optional().nullable(),
  availableForSale: z.boolean().optional(),
  featuredImage: z
    .object({
      id: z.string(),
      url: z.string(),
      altText: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  variants: z.object({
    nodes: z.array(VARIANT_SCHEMA),
  }),
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

//product search schema
export const PRODUCT_SEARCH_SCHEMA = PRODUCT_SCHEMA.pick({
  id: true,
  title: true,
  handle: true,
  featuredImage: true,
  availableForSale: true,
});

// connection for graphql response
export const PRODUCT_LISTING_RESPONSE_SCHEMA = z.object({
  edges: z.array(z.object({ node: PRODUCT_SCHEMA })),
  pageInfo: z.object({
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
    endCursor: z.string().nullable().optional(),
  }),
});

//schema for product page - pdp
export const PRODUCT_DETAIL_SCHEMA = PRODUCT_SCHEMA.extend({
  variants: z.object({
    nodes: z.array(VARIANT_SCHEMA),
  }),

  images: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          url: z.string(),
          altText: z.string().optional().nullable(),
          id: z.string(),
        }),
      }),
    ),
  }),
});

export const PRODUCT_DETAIL_RESPONSE_SCHEMA = z.object({
  product: PRODUCT_DETAIL_SCHEMA,
});
