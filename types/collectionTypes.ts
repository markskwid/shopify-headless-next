import {
  COLLECTION_CONNECTION_SCHEMA,
  COLLECTION_DETAIL_SCHEMA,
  COLLECTION_SCHEMA,
} from "@/lib/schema/collectionSchema";
import { z } from "zod";

export type COLLECTION_LISTING_TYPE = z.infer<typeof COLLECTION_SCHEMA>;
export type COLLECTION_DETAIL_TYPE = z.infer<typeof COLLECTION_DETAIL_SCHEMA>;
export type COLLECTION_CONNECTION_TYPE = z.infer<
  typeof COLLECTION_CONNECTION_SCHEMA
>;
export type COLLECTION_BY_HANDLE_RESULT =
  | { success: true; collection: COLLECTION_DETAIL_TYPE }
  | { success: false; collection: null; errors?: unknown };
