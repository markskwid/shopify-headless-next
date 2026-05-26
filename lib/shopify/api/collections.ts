import "server-only";

import { client } from "../client";
import {
  FETCH_COLLECTION_BY_HANDLE,
  FETCH_COLLECTIONS,
  FETCH_FEATURED_COLLECTIONS,
  GET_COLLECTION_FILTER,
} from "@/graphql/queries";
import {
  COLLECTION_DETAIL_RESPONSE_SCHEMA,
  COLLECTION_FEATURED_RESPONSE_SCHEMA,
  COLLECTION_LISTING_RESPONSE_SCHEMA,
} from "../../schema/collection";
import { API_RESPONSE } from "@/types/response";
import { COLLECTION_DETAIL_TYPE, COLLECTION_TYPE } from "@/types/collection";
import { normalizeError } from "@/utils/normalizeErrors";
import { cacheLife, cacheTag } from "next/cache";
import { FILTER_RESPONSE_SCHEMA } from "@/lib/schema/filters";
import { FILTER_TYPE } from "@/types/filters";

//Get all collections
export const getCollections = async (): Promise<
  API_RESPONSE<COLLECTION_TYPE[]>
> => {
  try {
    const { data, errors } = await client.request(FETCH_COLLECTIONS);

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
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
        data: null,
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
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

//Get all collections
export const getCollectionByHandle = async (
  handle: string,
  filters?: object[],
  sortKey?: string,
  reverse?: boolean,
): Promise<API_RESPONSE<COLLECTION_DETAIL_TYPE>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`collection-${handle}-${JSON.stringify(filters ?? [])}-${sortKey ?? "CREATED"}-${reverse ?? false}`);
  try {
    const { data, errors } = await client.request(FETCH_COLLECTION_BY_HANDLE, {
      variables: {
        handle,
        filters: filters ?? [],
        sortKey: sortKey ?? "CREATED",
        reverse: reverse ?? false
      },
    });

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

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

    if (!collection) {
      return {
        success: false,
        data: null,
        errors: ["Collection is empty"],
      };
    }

    return {
      success: true,
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
};

// get featured collections
export const getFeaturedCollections = async (): Promise<
  API_RESPONSE<COLLECTION_TYPE[]>
> => {
  "use cache";
  cacheLife("hours");
  cacheTag("featured-collections");
  try {
    const { data, errors } = await client.request(FETCH_FEATURED_COLLECTIONS);

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = COLLECTION_FEATURED_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success || !parsed.data) {
      console.error("Error getting collections", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    const featuredCollections =
      parsed.data.metaobjects.nodes[0].fields[0].references.nodes;

    return {
      success: !!parsed.data,
      data: featuredCollections ?? null,
      errors: null,
      warnings: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

//get collections filters
export const getFilters = async (
  handle: string,
): Promise<API_RESPONSE<FILTER_TYPE[]>> => {
  "use cache";
  cacheLife("hours");
  cacheTag(`${handle}-filters`);
  try {
    const { data, errors } = await client.request(GET_COLLECTION_FILTER, {
      variables: {
        handle,
      },
    });

    if (errors) {
      console.log(errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = FILTER_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    return {
      success: true,
      data: parsed.data.collection.products.filters,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};
