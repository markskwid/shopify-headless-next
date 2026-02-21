import {
  CUSTOMER_ACCESS_TOKEN_SCHEMA,
  CUSTOMER_SCHEMA,
} from "@/lib/schema/customerSchema";
import { z } from "zod";

export type CUSTOMER_TYPE = z.infer<typeof CUSTOMER_SCHEMA>;
export type CUSTOMER_ACCESS_TOKEN_TYPE = z.infer<
  typeof CUSTOMER_ACCESS_TOKEN_SCHEMA
>;
