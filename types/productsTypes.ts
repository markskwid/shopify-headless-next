import {
  PRODUCT_DETAIL_SCHEMA,
  PRODUCT_SCHEMA,
  PRODUCTS_CONNECTION_SCHEMA,
} from "@/lib/schema/productSchema";
import { z } from "zod";

export type PRODUCT_LISTING_TYPE = z.infer<typeof PRODUCT_SCHEMA>;
export type PRODUCT_DETAIL_TYPE = z.infer<typeof PRODUCT_DETAIL_SCHEMA>;
export type PRODUCT_CONNECTION_TYPE = z.infer<
  typeof PRODUCTS_CONNECTION_SCHEMA
>;
