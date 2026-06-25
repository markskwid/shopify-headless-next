import { ADDRESS_SCHEMA } from "@/lib/schema/address";
import { z } from "zod";

export type ADDRESS_TYPE = z.infer<typeof ADDRESS_SCHEMA>;
