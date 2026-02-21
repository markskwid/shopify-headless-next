import { client } from "../client";
import { cache } from "react";
import {
  FETCH_COLLECTION_BY_HANDLE,
  FETCH_COLLECTIONS,
} from "@/graphql/queries";
import {
  COLLECTION_DETAIL_RESPONSE_SCHEMA,
  COLLECTION_DETAIL_SCHEMA,
  COLLECTION_LISTING_RESPONSE_SCHEMA,
} from "../../schema/collectionSchema";
import { API_RESPONSE } from "@/types/responseTypes";
import {
  COLLECTION_DETAIL_TYPE,
  COLLECTION_LISTING_TYPE,
} from "@/types/collectionTypes";
import { normalizeError } from "@/utils/normalizeErrors";

//Get all collections
export const getCollections = cache(
  async (): Promise<API_RESPONSE<COLLECTION_LISTING_TYPE[]>> => {
    try {
      const { data, errors } = await client.request(FETCH_COLLECTIONS);

      if (errors) {
        console.log("Graphql Errors", errors);
        return {
          success: false,
          data: [],
          pageInfo: null,
          errors: normalizeError(errors),
        };
      }

      console.log(data);

      const parsed = COLLECTION_LISTING_RESPONSE_SCHEMA.safeParse(data);

      if (!parsed.success) {
        console.log("Invalid data: ", parsed.error);
        return {
          success: false,
          data: [],
          pageInfo: null,
          errors: normalizeError(parsed.error),
        };
      }

      const collections = parsed.data.collections;

      return {
        success: !!collections,
        data: collections.edges.map((e) => e.node),
        pageInfo: parsed.data.collections.pageInfo
          ? parsed.data.collections.pageInfo
          : null,
        errors: null,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      return {
        success: false,
        data: [],
        pageInfo: null,
        errors: normalizeError(error),
      };
    }
  },
);

//Get all collections
export const getCollectionByHandle = cache(
  async (handle: string): Promise<API_RESPONSE<COLLECTION_DETAIL_TYPE>> => {
    try {
      const { data, errors } = await client.request(
        FETCH_COLLECTION_BY_HANDLE,
        {
          variables: {
            handle,
          },
        },
      );

      if (errors) {
        console.log("Graphql Errors", errors);
        return {
          success: false,
          data: null,
          errors: normalizeError(errors),
        };
      }

      console.log(data);
      const parsed = COLLECTION_DETAIL_RESPONSE_SCHEMA.safeParse(data);

      if (!parsed.success) {
        console.log("Invalid Data: ", parsed.error);
        return {
          success: false,
          data: null,
          errors: normalizeError(parsed.error),
        };
      }

      const collection = parsed.data.collection;

      return {
        success: !!collection,
        data: collection,
        errors: null,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      return {
        success: false,
        data: null,
        errors: normalizeError(error),
      };
    }
  },
);
