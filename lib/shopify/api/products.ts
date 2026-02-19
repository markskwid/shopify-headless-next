import { FETCH_PRODUCT_BY_HANDLE, FETCH_PRODUCTS } from "@/graphql/queries";
import { client } from "../client";
import { cache } from "react";
import {
  PRODUCT_DETAIL_SCHEMA,
  PRODUCTS_CONNECTION_SCHEMA,
} from "../../schema/productSchema";

//Get all products
export const getProducts = cache(async () => {
  const { data, errors } = await client.request(FETCH_PRODUCTS);

  if (Array.isArray(errors) && errors.length > 0) {
    console.log("Graphql Errors", errors);
    return [];
  }

  const parsed = PRODUCTS_CONNECTION_SCHEMA.safeParse(data.products);

  if (!parsed.success) {
    console.error(parsed.error);
    return {
      products: [],
      pageInfo: null,
    };
  }

  return {
    products: parsed.data.edges.map((edge) => edge.node),
    pageInfo: parsed.data.pageInfo,
  };
});

//Get product by handle
export const getProductByHandle = cache(async (handle: string) => {
  const { data, errors } = await client.request(FETCH_PRODUCT_BY_HANDLE, {
    variables: {
      handle,
    },
  });

  if (Array.isArray(errors) && errors.length > 0) {
    console.log("Graphql Errors", errors);
    return [];
  }

  const parsed = PRODUCT_DETAIL_SCHEMA.safeParse(data.product);

  if (!parsed.success) {
    console.log("Invalid value", parsed.error);
    return [];
  }

  return parsed.data;
});
