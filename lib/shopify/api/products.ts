import { API_RESPONSE } from "./../../../types/responseTypes";
import { FETCH_PRODUCT_BY_HANDLE, FETCH_PRODUCTS } from "@/graphql/queries";
import { client } from "../client";
import { cache } from "react";
import {
  PRODUCT_DETAIL_RESPONSE_SCHEMA,
  PRODUCT_LISTING_RESPONSE_SCHEMA,
} from "../../schema/productSchema";
import { normalizeError } from "@/utils/normalizeErrors";
import {
  PRODUCT_DETAIL_TYPE,
  PRODUCT_LISTING_TYPE,
} from "@/types/productsTypes";

//Get all products
export const getProducts = async (): Promise<
  API_RESPONSE<PRODUCT_LISTING_TYPE[]>
> => {
  try {
    const { data, errors } = await client.request(FETCH_PRODUCTS);

    if (errors) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        data: [],
        pageInfo: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = PRODUCT_LISTING_RESPONSE_SCHEMA.safeParse(data.products);

    if (!parsed.success) {
      console.error(parsed.error);
      return {
        success: false,
        data: [],
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
      data: [],
      pageInfo: null,
      errors: normalizeError(error),
    };
  }
};

//Get product by handle
export const getProductByHandle = cache(
  async (handle: string): Promise<API_RESPONSE<PRODUCT_DETAIL_TYPE>> => {
    try {
      const { data, errors } = await client.request(FETCH_PRODUCT_BY_HANDLE, {
        variables: {
          handle,
        },
      });

      if (errors) {
        console.log("Graphql Errors", errors);
        return {
          success: false,
          errors: normalizeError(errors),
          data: null,
        };
      }

      const parsed = PRODUCT_DETAIL_RESPONSE_SCHEMA.safeParse(data);

      if (!parsed.success) {
        console.log("Invalid value", parsed.error);
        return {
          success: false,
          errors: normalizeError(parsed.error),
          data: null,
        };
      }

      const product = parsed.data.product;

      return {
        success: !!product,
        data: product !== null ? product : null,
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
