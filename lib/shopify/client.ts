import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { serverConfig } from "@/config/server.config";
export const client = createStorefrontApiClient({
  storeDomain: serverConfig.store.domain,
  apiVersion: serverConfig.store.apiVersion,
  publicAccessToken: serverConfig.store.storefrontToken,
});
