import "server-only";
import { client } from "../client";
import { normalizeError } from "@/utils/normalizeErrors";
import { FETCH_SOCIAL_MEDIA } from "@/graphql/queries";
import { cacheTag, cacheLife } from "next/cache";
import { SOCIAL_MEDIA_RESPONSE_SCHEMA } from "@/lib/schema/metaobjects";
import { API_RESPONSE } from "@/types/response";
import { METAOBECTS_TYPE } from "@/types/metaobjects";
import { serverConfig } from "@/config/server.config";

export const getSocialMedias = async (): Promise<
  API_RESPONSE<METAOBECTS_TYPE[]>
> => {
  "use cache";
  cacheLife(serverConfig.cache.socialMedia);
  cacheTag("social-medias");

  try {
    const { data, errors } = await client.request(FETCH_SOCIAL_MEDIA);

    if (errors && errors.graphQLErrors) {
      console.error("GraphQL error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = SOCIAL_MEDIA_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Zod Error", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const socialMedias = parsed.data.metaobjects.nodes;

    return {
      success: true,
      data: socialMedias,
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
