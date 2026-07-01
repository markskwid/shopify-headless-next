// config/server.config.ts
import "server-only";

export const serverConfig = {
  store: {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
    storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN!,
    apiVersion: process.env.SHOPIFY_API_VERSION ?? "2026-01",
  },

  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET!,
  homePageBannerMetaobjectType: process.env.NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE ?? "homepage_banner",

  cache: {
    products: "minutes" as const,
    collections: "hours" as const,
    menu: "hours" as const,
    socialMedia: "weeks" as const,
    homepageBanner: "hours" as const,
  },

  limits: {
    productsPerPage: Number(process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE ?? 12),
    collectionProductsPerPage: Number(
      process.env.NEXT_PUBLIC_COLLECTION_PRODUCTS_PER_PAGE ?? 15,
    ),
    cartLines: Number(process.env.NEXT_PUBLIC_CART_LINES_LIMIT ?? 50),
    productImages: Number(process.env.NEXT_PUBLIC_PRODUCT_IMAGES_LIMIT ?? 10),
    productVariants: Number(
      process.env.NEXT_PUBLIC_PRODUCT_VARIANTS_LIMIT ?? 100,
    ),
    recommendations: Number(process.env.NEXT_PUBLIC_RECOMMENDATIONS_LIMIT ?? 8),
  },

  build: {
    preRenderTopProducts: Number(process.env.PRERENDER_TOP_PRODUCTS ?? 0),
    preRenderCollections: process.env.PRERENDER_COLLECTIONS === "true",
  },
} as const;
