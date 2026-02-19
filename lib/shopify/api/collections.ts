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

//Get all collections
export const getCollections = cache(async () => {
  const { data, errors } = await client.request(FETCH_COLLECTIONS);

  if (Array.isArray(errors) && errors.length > 0) {
    console.log("Graphql Errors", errors);
    return [];
  }

  const parsed = COLLECTION_CONNECTION_SCHEMA.safeParse(data.collections);

  if (!parsed.success) {
    console.log("Invalid data: ", parsed.error);
    return [];
  }

  return parsed.data;
});

//Get all collections
export const getCollectionByHandle = cache(async (handle: string) => {
  const { data, errors } = await client.request(FETCH_COLLECTION_BY_HANDLE, {
    variables: {
      handle,
    },
  });

  if (Array.isArray(errors) && errors.length > 0) {
    console.log("Graphql Errors", errors);
    return [];
  }

  const parsed = COLLECTION_DETAIL_SCHEMA.safeParse(data.collection);

  if (!parsed.success) {
    console.log("Invalid Data: ", parsed.error);
    return [];
  }

  return parsed.data;
});
