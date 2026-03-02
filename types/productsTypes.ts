import {
  PRODUCT_DETAIL_SCHEMA,
  PRODUCT_SCHEMA,
  PRODUCT_LISTING_RESPONSE_SCHEMA,
} from "@/lib/schema/productSchema";
import { VARIANT_SCHEMA } from "@/lib/schema/variantSchema";
import { z } from "zod";

export type PRODUCT_LISTING_TYPE = z.infer<typeof PRODUCT_SCHEMA>;
export type PRODUCT_DETAIL_TYPE = z.infer<typeof PRODUCT_DETAIL_SCHEMA>;
export type PRODUCT_CONNECTION_TYPE = z.infer<
  typeof PRODUCT_LISTING_RESPONSE_SCHEMA
>;
export type PRODUCT_VARIANT_TYPE = z.infer<typeof VARIANT_SCHEMA>;
