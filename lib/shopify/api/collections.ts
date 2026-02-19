import { client } from "../client";
import { cache } from "react";
import {
  FETCH_COLLECTION_BY_HANDLE,
  FETCH_COLLECTIONS,
} from "@/graphql/queries";
import {
  COLLECTION_DETAIL_SCHEMA,
  COLLECTION_CONNECTION_SCHEMA,
} from "../../schema/collectionSchema";
import {
  COLLECTION_BY_HANDLE_RESULT,
  COLLECTION_LISTING_TYPE,
} from "@/types/collectionTypes";

//Get all collections
export const getCollections = cache(async () => {
  try {
    const { data, errors } = await client.request(FETCH_COLLECTIONS);

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        collections: [],
        pageInfo: null,
        errors,
      };
    }

    const parsed = COLLECTION_CONNECTION_SCHEMA.safeParse(data.collections);

    if (!parsed.success) {
      console.log("Invalid data: ", parsed.error);
      return {
        success: false,
        collections: [],
        pageInfo: null,
        errors: parsed.error,
      };
    }

    return {
      success: true,
      collections: parsed.data.edges.map((e) => e.node),
      pageInfo: parsed.data.pageInfo,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      collections: [],
      pageInfo: null,
    };
  }
});

//Get all collections
export const getCollectionByHandle = cache(async (handle: string) => {
  try {
    const { data, errors } = await client.request(FETCH_COLLECTION_BY_HANDLE, {
      variables: {
        handle,
      },
    });

    if (data.collection === null) {
      console.log("Collection Null: ", errors);
      return {
        success: false,
        collection: null,
        errors,
      };
    }

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        collection: null,
        errors,
      };
    }

    const parsed = COLLECTION_DETAIL_SCHEMA.safeParse(data.collection);

    if (!parsed.success) {
      console.log("Invalid Data: ", parsed.error);
      return {
        success: false,
        collection: null,
        errors: parsed.error,
      };
    }

    return {
      success: true,
      collection: parsed.data,
    };
  } catch (error: unknown) {
    let formattedError: unknown = error;
    if (error instanceof Error) {
      console.error(error.message);
      formattedError = error.message;
    }

    return {
      success: false,
      collection: null,
      errors: formattedError,
    };
  }
});
