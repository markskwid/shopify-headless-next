// NOTE: this file ships to the browser — no secrets here.

export const clientConfig = {
  store: {
    name: process.env.NEXT_PUBLIC_STORE_NAME ?? "Store Name",
  },

  locale: {
    language: process.env.NEXT_PUBLIC_LOCALE ?? "en-US",
    currency: process.env.NEXT_PUBLIC_CURRENCY ?? "USD",
  },

  navigation: {
    mainMenuHandle: process.env.NEXT_PUBLIC_MAIN_MENU_HANDLE ?? "main-menu",
    footerMenuHandle: process.env.NEXT_PUBLIC_FOOTER_MENU_HANDLE ?? "footer",
  },

  homepage: {
    bannerImageUrl: process.env.NEXT_PUBLIC_BANNER_IMAGE_URL ?? "",
    bannerBlurDataUrl: process.env.NEXT_PUBLIC_BANNER_BLUR_URL ?? "",
    featuredCollectionsMetaobjectType:
      process.env.NEXT_PUBLIC_FEATURED_COLLECTIONS_TYPE ??
      "featured_collections",
  },

  features: {
    wishlist: process.env.NEXT_PUBLIC_FEATURE_WISHLIST === "true",
    productReviews: process.env.NEXT_PUBLIC_FEATURE_REVIEWS === "true",
    subscriptions: process.env.NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS === "true",
    predictiveSearch:
      process.env.NEXT_PUBLIC_FEATURE_PREDICTIVE_SEARCH === "true",
  },
} as const;
