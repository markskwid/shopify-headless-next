import "server-only";

import { sanityFetch } from "../lib/live";
import { HEADER_SETTINGS_QUERY } from "../queries/header";

export const getHeaderMenu = async () => {
  "use cache";

  const { data } = await sanityFetch({
    query: HEADER_SETTINGS_QUERY,
  });

  return data;
};
