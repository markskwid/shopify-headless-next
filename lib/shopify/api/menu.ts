import "server-only";
import { client } from "../client";
import { GET_MENU_BY_HANDLE } from "@/graphql/queries";
import { MENU_RESPONSE_SCHEMA } from "@/lib/schema/menu";
import { API_RESPONSE } from "@/types/response";
import { MENU_TYPE } from "@/types/menu";
import { normalizeError } from "@/utils/normalizeErrors";
import { cacheLife, cacheTag } from "next/cache";
import { serverConfig } from "@/config/server.config";

export const getMenuByHandle = async (
  handle: string,
): Promise<API_RESPONSE<MENU_TYPE[]>> => {
  "use cache";
  cacheLife(serverConfig.cache.menu);
  cacheTag(`menu-${handle}`);
  try {
    const { data, errors } = await client.request(GET_MENU_BY_HANDLE, {
      variables: { handle },
    });

    if (errors) {
      console.error("Graphql error", errors.message);
      return {
        success: false,
        data: null,
        errors: normalizeError(errors),
      };
    }

    const parsed = MENU_RESPONSE_SCHEMA.safeParse(data);

    if (!parsed.success) {
      console.error("Invalid data", parsed.error);
      return {
        success: false,
        data: null,
        errors: normalizeError(parsed.error),
      };
    }

    const menuItems = parsed.data.menu?.items;

    if (!menuItems) {
      return {
        success: false,
        data: null,
        errors: ["Empty menu items"],
      };
    }

    return {
      success: true,
      data: menuItems,
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
