import "server-only";

import { API_RESPONSE } from "../../../types/response";
import {
  FETCH_PRODUCT_BY_HANDLE,
  FETCH_PRODUCTS,
  GET_PRODUCT_RECOMMENDATION,
} from "@/graphql/queries";
import { client } from "../client";

import {
  PRODUCT_DETAIL_RESPONSE_SCHEMA,
  PRODUCT_LISTING_RESPONSE_SCHEMA,
  PRODUCT_RECOMMENDATION_RESPONSE_SCHEMA,
} from "../../schema/product";
import { normalizeError } from "@/utils/normalizeErrors";
import { PRODUCT_DETAIL_TYPE, PRODUCT_LISTING_TYPE } from "@/types/product";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

//Get all products
export const getProducts = async (
  sortKey?: string,
  reverse?: boolean,
): Promise<API_RESPONSE<PRODUCT_LISTING_TYPE[]>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`homepage-products`);
  try {
    const { data, errors } = await client.request(FETCH_PRODUCTS, {
      variables: {
        sortKey,
        reverse,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = PRODUCT_LISTING_RESPONSE_SCHEMA.safeParse(data.products);

    if (!parsed.success) {
      console.error(parsed.error);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(parsed.error),
      };
    }

    return {
      success: true,
      data: parsed.data.edges.map((edge) => edge.node),
      pageInfo: parsed.data.pageInfo ? parsed.data.pageInfo : null,
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

//get product recommendation
export const getProductRecommendation = async (
  productHandle: string,
): Promise<API_RESPONSE<PRODUCT_LISTING_TYPE[]>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`product-recommendation-${productHandle}`);
  try {
    const { data, errors } = await client.request(GET_PRODUCT_RECOMMENDATION, {
      variables: {
        productHandle,
      },
    });

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        errors: normalizeError(errors),
        data: null,
      };
    }

    const parsed = PRODUCT_RECOMMENDATION_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return {
        success: false,
        data: null,
        pageInfo: null,
        errors: normalizeError(parsed.error),
      };
    }

    return {
      success: true,
      data: parsed.data.productRecommendations,
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

export const getProductByHandle = async (
  handle: string,
): Promise<API_RESPONSE<PRODUCT_DETAIL_TYPE>> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`product-${handle}`);

  try {
    const { data, errors } = await client.request(FETCH_PRODUCT_BY_HANDLE, {
      variables: { handle },
    });

    console.log("Storefront title:", data.product?.title);

    if (errors) {
      console.error("Graphql Errors", errors);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = PRODUCT_DETAIL_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Invalid value", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const product = parsed.data.product;

    if (!product) {
      return {
        success: false,
        data: null,
        errors: ["Product not found"],
      };
    }

    return {
      success: true,
      data: product,
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
