import { z } from "zod";
import {
  ADD_TO_CART_LINE_SCHEMA,
  CART_SCHEMA,
  CREATED_CART_SCHEMA,
} from "@/lib/schema/cartSchema";
export type CART_TYPE = z.infer<typeof CART_SCHEMA>;
export type CREATED_CART_TYPE = z.infer<typeof CREATED_CART_SCHEMA>;
export type ADD_TO_CART_LINE_TYPE = z.infer<typeof ADD_TO_CART_LINE_SCHEMA>;
