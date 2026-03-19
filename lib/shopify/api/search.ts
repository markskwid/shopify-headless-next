import { normalizeError } from "@/utils/normalizeErrors";
import { client } from "../client";
import { PREDICTIVE_SEARCH } from "@/graphql/queries";
import { z } from "zod";
import { API_RESPONSE } from "@/types/response";
import { PRODUCT_SEARCH_TYPE } from "@/types/product";
import { PRODUCT_SEARCH_SCHEMA } from "@/lib/schema/product";

const SEARCH_RESULT_SCHEMA = z.object({
  predictiveSearch: z.object({
    products: z.array(PRODUCT_SEARCH_SCHEMA),
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

    if (errors && errors.graphQLErrors) {
      console.log("Graphql Error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
        warnings: null,
      };
    }

    const parsed = SEARCH_RESULT_SCHEMA.safeParse(data);

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
