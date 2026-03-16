import "server-only";
import { client } from "../client";
import { normalizeError } from "@/utils/normalizeErrors";
import { FETCH_SOCIAL_MEDIA } from "@/graphql/queries";
import { cacheTag, cacheLife } from "next/cache";
import { SOCIAL_MEDIA_RESPONSE_SCHEMA } from "@/lib/schema/metaobjects";

export const getSocialMedias = async () => {
  "use cache";
  cacheLife("weeks");
  cacheTag("social-medias");

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
