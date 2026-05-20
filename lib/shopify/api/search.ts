"use server";
import { normalizeError } from "@/utils/normalizeErrors";
import { client } from "../client";
import { PREDICTIVE_SEARCH, SEARCH_PRODUCTS } from "@/graphql/queries";
import { success, z } from "zod";
import { API_RESPONSE } from "@/types/response";
import { PRODUCT_LISTING_TYPE, PRODUCT_SEARCH_TYPE } from "@/types/product";
import { PRODUCT_SCHEMA, PRODUCT_SEARCH_SCHEMA } from "@/lib/schema/product";
import { cacheLife, cacheTag } from "next/cache";

const PREDICTIVE_SEARCH_RESULT_SCHEMA = z.object({
  predictiveSearch: z.object({
    products: z.array(PRODUCT_SEARCH_SCHEMA),
  }),
});

const SEARCH_RESULT_PAGE_SCHEMA = z.object({
  search: z.object({
    totalCount: z.number(),
    edges: z.array(
      z.object({
        node: PRODUCT_SCHEMA,
      }),
    ),
  }),
});

export const searchResults = async (
  query: string,
): Promise<API_RESPONSE<PRODUCT_SEARCH_TYPE[]>> => {
  try {
    const { data, errors } = await client.request(PREDICTIVE_SEARCH, {
      variables: {
        query,
      },
    });

    console.log(data);

    if (errors) {
      console.log("Graphql Error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = PREDICTIVE_SEARCH_RESULT_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Zod Error", parsed.error);
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

export const searchResultsPage = async (query: string) : Promise<API_RESPONSE<PRODUCT_LISTING_TYPE[]>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`search-${query}`);
  try {
    const { data, errors } = await client.request(SEARCH_PRODUCTS, {
      variables: {
        query,
      },
    });

    if (errors) {
      console.log("Graphql Error", errors.message);
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

    return {
      success: true,
      data: parsed.data.search.edges.map((edge) => edge.node),
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
