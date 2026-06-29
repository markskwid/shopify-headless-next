"use server";
import { normalizeError } from "@/utils/normalizeErrors";
import { client } from "../client";
import { PREDICTIVE_SEARCH, SEARCH_PRODUCTS } from "@/graphql/queries";
import { API_RESPONSE } from "@/types/response";
import { PRODUCT_SEARCH_TYPE } from "@/types/product";
import { cacheLife, cacheTag } from "next/cache";
import { PREDICTIVE_SEARCH_RESULT_SCHEMA, SEARCH_RESULT_PAGE_SCHEMA } from "@/lib/schema/search";
import { SEARCH_RESULT_PAGE_TYPE } from "@/types/search";


export const searchResults = async (
  query: string,
): Promise<API_RESPONSE<PRODUCT_SEARCH_TYPE[]>> => {
  try {
    const { data, errors } = await client.request(PREDICTIVE_SEARCH, {
      variables: {
        query,
      },
    });

    if (errors) {
      console.error("Graphql Error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = PREDICTIVE_SEARCH_RESULT_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error", parsed.error);
      return {
        success: false,
        data: null,
        warnings: null,
        errors: normalizeError(parsed.error),
      };
    }

    const searchData = parsed.data.predictiveSearch.products ?? [];

    return {
      success: true,
      data: searchData,
      warnings: null,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      warnings: null,
      errors: normalizeError(error),
    };
  }
};


export const searchResultsPage = async (
  query: string,
  sortKey?: string,
  reverse?: boolean,
): Promise<API_RESPONSE<SEARCH_RESULT_PAGE_TYPE>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`search`);
  try {
    const { data, errors } = await client.request(SEARCH_PRODUCTS, {
      variables: {
        query,
        sortKey,
        reverse,
      },
    });

    if (errors) {
      console.error("Graphql Error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = SEARCH_RESULT_PAGE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
        warnings: null,
      };
    }

    //transform data
    const newData: SEARCH_RESULT_PAGE_TYPE = {
      totalCount: parsed.data.search.totalCount,
      products: parsed.data.search.edges.map((edge) => edge.node),
      pageInfo: parsed.data.search.pageInfo,
    };

    return {
      success: true,
      data: newData,
      errors: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      warnings: null,
      errors: normalizeError(error),
    };
  }
};
