import { cache } from "react";
import { client } from "../client";
import { GET_MENU_BY_HANDLE } from "@/graphql/queries";
import { MENU_RESPONSE_SCHEMA } from "@/lib/schema/menuSchema";
import { API_RESPONSE } from "@/types/responseTypes";
import { MENU_TYPE } from "@/types/menuTypes";
import { normalizeError } from "@/utils/normalizeErrors";

export const getMenuByHandle = cache(
  async (handle: string): Promise<API_RESPONSE<MENU_TYPE[]>> => {
    try {
      const { data, errors } = await client.request(GET_MENU_BY_HANDLE, {
        variables: { handle },
      });

      if (errors) {
        console.log("Graphql error", errors.message);
        return {
          success: false,
          data: [],
          errors: normalizeError(errors),
        };
      }

      const parsed = MENU_RESPONSE_SCHEMA.safeParse(data);

      if (!parsed.success) {
        console.log("Invalid data", parsed.error);
        return {
          success: false,
          data: [],
          errors: normalizeError(parsed.error),
        };
      }

      const menuItems = parsed.data.menu?.items;

      return {
        success: !!menuItems,
        data: menuItems ? menuItems : [],
        errors: menuItems ? null : ["Unknown Error"],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      return {
        success: false,
        data: [],
        errors: normalizeError(error),
      };
    }
  },
);
