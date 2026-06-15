import { ORDER_SCHEMA } from "@/lib/schema/customer";
import { z } from "zod";

export type CUSTOMER_ORDER_TYPE = z.infer<typeof ORDER_SCHEMA>;
