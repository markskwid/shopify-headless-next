import "server-only";
import { sanityFetch } from "../lib/live";
import { FOOTER_SETTINGS_QUERY } from "../queries/footer";
import { FOOTER_SETTINGS_TYPE } from "@/types/navigation";

export const getFooterSettings = async () => {
  "use cache";

  const { data } = await sanityFetch({
    query: FOOTER_SETTINGS_QUERY,
  });

  return data;
};
