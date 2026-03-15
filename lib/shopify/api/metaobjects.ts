import "server-only";
import { client } from "../client";
import { normalizeError } from "@/utils/normalizeErrors";
import { FETCH_SOCIAL_MEDIA } from "@/graphql/queries";
import { z } from "zod";

const METAOBJECT_SCHEMA = z.object({
  fields: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .default([])
    .nullable(),
  handle: z.string(),
  id: z.string(),
});

const SOCIAL_MEDIA_RESPONSE_SCHEMA = z.object({
  metaobjects: z.object({
    nodes: z.array(METAOBJECT_SCHEMA).default([]).nullable(),
  }),
});

export const getSocialMedias = async () => {
  try {
    const { data, errors } = await client.request(FETCH_SOCIAL_MEDIA);

    if (errors && errors.graphQLErrors) {
      console.log("GraphQL error", errors.message);
      return {
        success: false,
        data: null,
        error: normalizeError(errors),
        warning: null,
      };
    }

    const parsed = SOCIAL_MEDIA_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.log("Zod Error", parsed.error);
      return {
        success: false,
        data: null,
        error: normalizeError(parsed.error),
        warning: null,
      };
    }

    const accounts = parsed.data.metaobjects.nodes;

    return {
      success: !!accounts,
      data: accounts ?? null,
      errors: null,
      warning: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      data: null,
      error: normalizeError(error),
      warning: null,
    };
  }
};
