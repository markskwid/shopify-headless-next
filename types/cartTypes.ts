import { z } from "zod";
import {
  CART_LINE_SCHEMA,
  CART_SCHEMA,
  CREATED_CART_SCHEMA,
  GET_CART_RESPONSE_SCHEMA,
} from "@/lib/schema/cartSchema";
export type CART_TYPE = z.infer<typeof CART_SCHEMA>;
export type GET_CART_TYPE = z.infer<typeof GET_CART_RESPONSE_SCHEMA>;
export type CREATED_CART_TYPE = z.infer<typeof CREATED_CART_SCHEMA>;
export type CART_LINE_TYPE = z.infer<typeof CART_LINE_SCHEMA>;
