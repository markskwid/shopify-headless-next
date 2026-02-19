import { FETCH_PRODUCT_BY_HANDLE, FETCH_PRODUCTS } from "@/graphql/queries";
import { client } from "../client";
import { cache } from "react";
import {
  PRODUCT_DETAIL_SCHEMA,
  PRODUCTS_CONNECTION_SCHEMA,
} from "../../schema/productSchema";

//Get all products
export const getProducts = cache(async () => {
  try {
    const { data, errors } = await client.request(FETCH_PRODUCTS);

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        products: [],
        pageInfo: null,
        errors,
      };
    }

    const parsed = PRODUCTS_CONNECTION_SCHEMA.safeParse(data.products);

    if (!parsed.success) {
      console.error(parsed.error);
      return {
        success: false,
        products: [],
        pageInfo: null,
        errors: parsed.error,
      };
    }

    return {
      success: true,
      products: parsed.data.edges.map((edge) => edge.node),
      pageInfo: parsed.data.pageInfo,
    };
  } catch (error: unknown) {
    let formattedError: unknown = error;
    if (error instanceof Error) {
      console.error(error.message);
      formattedError = error.message;
    }

    return {
      success: false,
      products: [],
      pageInfo: null,
      errors: formattedError,
    };
  }
});

//Get product by handle
export const getProductByHandle = cache(async (handle: string) => {
  try {
    const { data, errors } = await client.request(FETCH_PRODUCT_BY_HANDLE, {
      variables: {
        handle,
      },
    });

    if (data.products === null) {
      return {
        success: false,
        product: null,
      };
    }

    if (Array.isArray(errors) && errors.length > 0) {
      console.log("Graphql Errors", errors);
      return {
        success: false,
        errors,
        product: null,
      };
    }

    const parsed = PRODUCT_DETAIL_SCHEMA.safeParse(data.product);

    if (!parsed.success) {
      console.log("Invalid value", parsed.error);
      return {
        success: false,
        errors: parsed.error,
        product: null,
      };
    }

    return {
      success: true,
      product: parsed.data,
    };
  } catch (error: unknown) {
    let formattedError: unknown = error;
    if (error instanceof Error) {
      console.error(error.message);
      formattedError = error.message;
    }

    return {
      success: false,
      product: null,
      errors: formattedError,
    };
  }
});
