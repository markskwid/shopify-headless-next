import "server-only";
import { client } from "../client";
import { normalizeError } from "@/utils/normalizeErrors";
import { FETCH_HOMEPAGE_BANNER, FETCH_SOCIAL_MEDIA } from "@/graphql/queries";
import { cacheTag, cacheLife } from "next/cache";
import {
  BANNER_RESPONSE_SCHEMA,
  METAOBJECT_RESPONSE_SCHEMA,
} from "@/lib/schema/metaobjects";
import { API_RESPONSE } from "@/types/response";
import { BANNER_TYPE, METAOBECTS_TYPE } from "@/types/metaobjects";
import { serverConfig } from "@/config/server.config";
import { normalizeBannerFields } from "@/utils/normalizeBannerFields";

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

    const parsed = METAOBJECT_RESPONSE_SCHEMA.safeParse(data);

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

export const getHomepageBanner = async (): Promise<
  API_RESPONSE<BANNER_TYPE[]>
> => {
  "use cache";
  cacheLife(serverConfig.cache.homepageBanner);
  cacheTag("homepage-banners");

  try {
    const { data, errors } = await client.request(FETCH_HOMEPAGE_BANNER, {
      variables: {
        name: serverConfig.homePageBannerMetaobjectType,
      },
    });

    if (errors) {
      return { success: false, data: null, errors: normalizeError(errors) };
    }

    const parsed = BANNER_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const nodes = parsed.data.metaobjects.nodes;

    if (!nodes.length) {
      return { success: false, data: null, errors: ["No banner slides found"] };
    }

    return {
      success: true,
      data: nodes.map((node) => ({
        id: node.id,
        handle: node.handle,
        ...normalizeBannerFields(node.fields),
      })),
      errors: null,
    };
  } catch (error: unknown) {
    return { success: false, data: null, errors: normalizeError(error) };
  }
};
