# Changelog

All notable changes to this project are documented here, grouped by feature area and ordered newest first.

This project is in active development. Entries reflect the current `develop` branch inspection and public commit history available as of July 9, 2026.

---

## [Unreleased] — Loading States, Cart Prerender Cleanup & Search UX (July 2026)

### Added

- **Route-level loading skeleton for account dashboard** via `app/(protected)/account/loading.tsx`.
  - Mirrors the account page layout with title/logout placeholders, welcome summary card, address stat, order stat, address card placeholders, and order placeholders.
  - Uses responsive flex/grid behavior to reduce layout shift while `getCustomer()` resolves.

- **Route-level loading skeleton for cart page** via `app/cart/loading.tsx`.
  - Mirrors the cart table layout, product rows, quantity controls, totals summary, discount/note rows, and checkout button.
  - Designed to reserve the cart page structure while `getCart()` resolves.

- **Route-level loading skeleton for product detail pages** via `app/product/[handle]/loading.tsx`.
  - Mirrors the PDP gallery, thumbnails, product title, price/description area, variant selector, quantity/add-to-cart controls, and related-products section.
  - Uses responsive image and content dimensions matching the final PDP layout as closely as possible.

- **Route-level loading skeleton for collection routes** via `app/collection/loading.tsx`.
  - Adds a reusable collection loading state with heading, filter/sort placeholder controls, and product-grid skeleton cards.
  - Applies to the collection route segment and child collection routes.

- **Route-level loading skeleton for search page** via `app/search/loading.tsx`.
  - Adds a search results skeleton with title/count placeholders, sort control placeholder, and a non-collection product-grid skeleton.

- **Reusable product listing skeleton components** in `components/Skeleton/ProductList.tsx`.
  - Added `ProductCardSkeleton` for product-card placeholders.
  - Added `ProductListSkeleton` props: `isCollection?: boolean` and `count?: number`.
  - Supports both collection-grid and standard product-grid breakpoints.

### Changed

- **Cart context now supports client-side cart hydration**.
  - `context/Cart.tsx` imports `getCartAction` and calls it inside a `useEffect()` after the client mounts.
  - Adds a `mounted` guard to avoid setting state after unmount while the cart request is still pending.
  - This is intended to keep request-specific cart cookie reads out of the static prerender path.

- **Product list skeleton layout refactored for reuse**.
  - Product card placeholders now include product image area, swatch placeholders, title placeholder, and price placeholder.
  - Collection and non-collection skeletons now share one component with a layout flag.

- **Collection loading now uses shared product-list skeletons** instead of route-specific placeholder duplication.

### Fixed

- **Homepage banner cache profile mismatch fixed**.
  - `getHomepageBanner()` now uses `serverConfig.cache.homepageBanner` instead of the social-media cache profile.

- **Metaobject webhook invalidation expanded**.
  - `/api/revalidate` now handles `metaobjects/update`, `metaobjects/create`, and `metaobjects/delete`.
  - Metaobject changes now invalidate `social-medias` and `homepage-banners` cache tags.

- **Search page empty-query behavior improved**.
  - Search without a `q` parameter now renders an empty-state message instead of returning a 404/not-found style experience.

- **Search form method corrected**.
  - Search submission now uses the correct request method for URL/query-driven search navigation.

- **Search input accessibility cleanup**.
  - Removed/fixed hardcoded `tabIndex` behavior on the search input.

- **Tailwind aspect ratio syntax normalized**.
  - Replaced `aspect-[3/4]` with `aspect-3/4` in product skeleton/card-style layouts.

- **Temporary artificial loading delay removed**.
  - Removed `sleep()`/test delay code used while testing route-level loading behavior.

### Follow-up Review

- Verify `app/layout.tsx` no longer calls `getCartAction()` during root layout rendering before considering the prerender cookie warning fully resolved. The cart context now loads cart data after hydration, but the root layout should also avoid server-side cart initialization if the goal is to keep public routes static/cache-friendly.

---

## [Unreleased] — Dynamic Banner & Query Limits (July 2026)

### Added

- **Homepage banner is now fully dynamic from Shopify metaobjects** — no code deployment required to change banner copy, images, or CTA links.
  - Clients manage slides directly in Shopify Admin → Content → Metaobjects.

- **Multi-slide banner carousel** using Embla Carousel.
  - Supports any number of slides.
  - Includes dot indicators and loop mode.
  - Navigation controls auto-hide when only one slide is present.

- `normalizeBannerFields` utility in `utils/normalizeBannerFields.ts`.
  - Converts Shopify's unordered metaobject field array into a typed `BANNER_TYPE` object.
  - Keys are mapped from the exact field keys configured in Shopify.

- `BANNER_TYPE` added to `types/metaobjects.ts`.

- `BANNER_RESPONSE_SCHEMA` added to `lib/schema/metaobjects.ts` for Zod validation of banner API responses.

- `FETCH_HOMEPAGE_BANNER` GraphQL query with `$name` variable.
  - Makes the metaobject type configurable without code changes.

- `homePageBannerMetaobjectType` added to `serverConfig`.
  - Uses `NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE`.
  - Defaults to `homepage_banner`.

- `homepageBanner` cache TTL profile added to `serverConfig.cache`.

- `.env.example` added/expanded to document required and optional environment variables for client onboarding.

- `utils/shimmer.ts` added for reusable SVG blur placeholders on Next.js images.

- `Search.tsx` wired to the predictive search feature flag in local/client configuration.

### Changed

- `Banner` component split across the server/client boundary:
  - `Banner.tsx` — Server Component that fetches and caches slides via `getHomepageBanner()`.
  - `BannerCarousel.tsx` — Client Component that owns Embla carousel state and interactions.

- `FETCH_PRODUCTS` now receives `first:` from `$firstProducts`, sourced from `serverConfig.limits.productsPerPage`.

- `FETCH_COLLECTION_BY_HANDLE` now receives `first:` from `$productsFirst`, sourced from `serverConfig.limits.collectionProductsPerPage`.

- `FETCH_PRODUCT_BY_HANDLE` now receives `collections(first:)` from `$firstCollections`.

- `/api/revalidate` now reads `serverConfig.webhookSecret` instead of directly accessing `process.env.SHOPIFY_WEBHOOK_SECRET`.

- Banner image quality reduced from `100` to `85` to reduce payload size without meaningful visual loss.

- First banner slide now uses priority/eager loading for LCP; subsequent slides lazy-load.

- Banner images now correctly use `placeholder="blur"` with `blurDataURL`.

### Fixed

- Removed invalid `preload` prop from Next.js `Image` usage.

- Embla selected snap index now syncs to React state through the `select` event.
  - Fixes dot indicator highlighting.

- Added missing `key` props to `.embla__slide` elements.

- Fixed banner slide wrapper sizing/positioning so `Image fill` has a valid reference box.

- Added missing `NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE` entry to `.env.example`.

---

## Reusability & Multi-Client Readiness (June 2026)

### Added

- `config/client.config.ts` — browser-safe configuration for store identity, locale, currency, menu handles, and feature flags.

- `config/server.config.ts` — server-only configuration guarded by `import "server-only"`.
  - Centralizes API credentials, webhook secret, cache TTL profiles, query limits, and build flags.

- `/api/revalidate` Shopify webhook endpoint with HMAC verification.
  - Revalidates product, collection, and inventory tags through `revalidateTag()`.

- Cart note UI.
  - Customers can attach a note to their cart/order before checkout.

- `lib/schema/search.ts`.
  - Extracted `PREDICTIVE_RESULT_SCHEMA` and `SEARCH_RESULT_PAGE_SCHEMA` from the search API module.

- `types/search.ts`.
  - Extracted `SEARCH_RESULT_PAGE_TYPE` into domain type files.

- Dedicated metaobject type definitions in `types/metaobjects.ts`.

### Changed

- Cart server actions now accept typed parameters directly instead of `FormData`.
  - Applies to add, remove, update, discount, and note actions.

- `FETCH_PRODUCT_BY_HANDLE` reduced product images from `images(first: 30)` to `images(first: 10)`.

- `getProductRecommendation` now keys off `productHandle` instead of product ID.
  - Enables parallel product/recommendation fetching on PDPs.

- `useMediaQuery` moved from `lib/responsiveness/` to `hooks/`.

- Collection caching now uses stable `collection-{handle}` cache tags instead of sort/filter-param composite tags.

- Account/protected route redirection relies on `proxy.ts` instead of duplicated cookie checks in each protected page.

- Store logo now renders through `StoreLogo.tsx` using `clientConfig.store.name` instead of hardcoded logo text.

- `getSocialMedias` response shape corrected from `error`/`warning` to `errors`/`warnings` to match the shared API response contract.

### Fixed

- `getCartAction` no longer calls `getCart(cartId)` twice for the same cart ID.

- Debug `console.log` payload dumps replaced with `console.error` where appropriate.

- `setUpdatingVariant(null)` moved to a `finally` block to prevent stuck cart loading states after failed updates.

- Predictive search result URL formatting fixed.

---

## Account & Customer Management (June 2026)

### Added

- Full account dashboard with order history, address book, and customer profile summary.

- Address CRUD.
  - Create, update, remove, and set default address.
  - Zod input validation applied to address operations.

- Order list with fulfillment and payment status indicators.

- Customer logout with `customerAccessToken` cookie invalidation.

- Toast notification system started.

- `AuthContext` for client-side customer auth state.

### Changed

- `API_RESPONSE` return types standardized across address and logout server actions.

- Action files renamed to the consistent `action.ts` convention.

- Customer Zod schema and `GET_CUSTOMER_INFO` GraphQL query refactored for clarity.

### Fixed

- Address edit modal not pre-populating existing address data.

- `setDefaultAddressAction` failing when chained after `createAddressAction`.

- Account dashboard mobile layout issues.

- Unreachable `setError` code path.

---

## Cart & Checkout (May–June 2026)

### Added

- Dedicated full cart page at `/cart`, separate from the slide-out cart drawer.

- Discount code application/removal.
  - Includes dedicated Zod schema and GraphQL fragment.

- Stale cart detection.
  - Invalid cart IDs are cleared from cookies and a new cart is created on the next add-to-cart action.

- Lazy cart creation.
  - No Shopify cart is created until the customer's first add-to-cart action.

- `proxy.ts` route guard for `/account` routes.

- Customer identity attached to cart when logged in.

### Fixed

- Cart slider incorrectly rendering on the dedicated `/cart` page.

---

## Authentication (May 2026)

### Added

- Login and signup pages.

- Auth actions return structured error codes instead of raw messages.
  - Ready for i18n-style error mapping.

- `formatLoginError` utility for readable login error display.

### Fixed

- Stale form values flashing briefly when navigating away from login/signup mid-render.

---

## Product Listing, Collections & Search (April–May 2026)

### Added

- Collection page with client-side sort and filter controls.

- Dedicated search page with full results display.

- Predictive search with "view all results" link.

- Product slider component for horizontal product carousels.

- Dynamic skeleton loading states for product lists.

### Changed

- `ProductList` refactored to remove unnecessary `Suspense` wrappers.

- Sort component rewritten for more flexible URL search-param construction.

### Fixed

- Incorrect price display for single-variant products.

- Product listing card layout issues.

- Search query string not clearing when navigating away from search.

- Predictive search dropdown not closing on outside click.

- `API_RESPONSE` type gaps and missing null guards on the product page.

---

## Product Detail Page (April 2026)

### Added

- Product detail page with image gallery, variant/swatch selector, quantity stepper, and add-to-cart.

- Product image carousel.

- Product recommendations section.

### Fixed

- Product image and swatch selector interaction bugs.

- Cart, form, and carousel conflicts on PDP.

---

## Foundational Setup (February–March 2026)

### Added

- Initial project scaffold from `create-next-app`.

- Shopify Storefront API client with GraphQL queries, mutations, and fragments.

- Product and customer TypeScript types.

- Zod validation layer for Shopify API responses.

- Header, navigation, and cart slider UI.

- Homepage product listing with sort controls.

- Klaviyo newsletter subscription integration in the footer.

- Predictive search bar initial implementation.

### Changed

- Cart state management moved into React Context with loading indicators.

- `unstable_cache` usage migrated to the newer `"use cache"` directive.

- Raw `<img>` tags replaced with `next/image`.

### Fixed

- File naming inconsistencies in early commits.

- Blocking production build issue.

- Mobile search bar animation glitch.

- Header layout and spacing adjustments.

---

## Known Issues

- **Storefront API has no `trackInventory` field** — low stock messaging is not possible through the Storefront API alone. This data is only available through the Admin API.

- **Admin → Storefront API replication lag** — Shopify propagates Admin API writes to the Storefront API asynchronously. Even with immediate `revalidateTag()` calls, a fresh Storefront API read immediately after an edit can return stale data for roughly 1–2 minutes. This is a Shopify platform constraint, not a project cache bug.

- **Toast notification system incomplete** — `AuthContext` and some account actions have toast calls wired up, but the UI implementation is not fully finished.

- **Cart prerender warning should be re-tested** — `context/Cart.tsx` now loads the cart after hydration, but `app/layout.tsx` should not call `getCartAction()` during root layout render if the project goal is to keep public routes prerender/cache friendly.