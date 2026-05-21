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
    pageInfo: z
      .object({
        hasNextPage: z.boolean(),
        endCursor: z.string().nullable(),
      })
      .optional(),
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

type SEARCH_RESULT_PAGE_TYPE = {
  totalCount: number;
  products: PRODUCT_LISTING_TYPE[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export const searchResultsPage = async (
  query: string,
): Promise<API_RESPONSE<SEARCH_RESULT_PAGE_TYPE>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`search-${query}`);
  try {
    const { data, errors } = await client.request(SEARCH_PRODUCTS, {
      variables: {
        query,
      },
    });

    console.log("SEARCH RESULT DATA", data);

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
