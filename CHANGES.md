# Changelog

All notable changes to this project are documented here, grouped by feature area and ordered newest first. This project is in active development — entries reflect the actual commit history on `develop`.

---

## [Unreleased] — Dynamic Banner & Query Limits (July 2026)

### Added
- **Homepage banner is now fully dynamic from Shopify metaobjects** — no code deployment required to change banner copy, images, or CTA links. Clients manage slides directly in Shopify Admin → Content → Metaobjects
- **Multi-slide banner carousel** using Embla Carousel — supports any number of slides, with dot indicators and loop mode. Navigation controls auto-hide when only one slide is present
- `normalizeBannerFields` utility (`utils/normalizeBannerFields.ts`) — converts Shopify's unordered metaobject field array into a typed `BANNER_TYPE` object, keyed on the exact field keys defined in Shopify
- `BANNER_TYPE` added to `types/metaobjects.ts`
- `BANNER_RESPONSE_SCHEMA` added to `lib/schema/metaobjects.ts` for Zod validation of banner API responses
- `FETCH_HOMEPAGE_BANNER` GraphQL query with `$name` variable, making the metaobject type configurable without code changes
- `homePageBannerMetaobjectType` added to `serverConfig` (`NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE` env var, default: `homepage_banner`)
- `homepageBanner` cache TTL profile added to `serverConfig.cache`
- `.env.example` file — documents all required and optional environment variables for onboarding new clients
- `shimmer.ts` file added to use as blurDataURL on any next image

### Changed
- `Banner` component split into two files following the Next.js server/client boundary:
  - `Banner.tsx` — Server Component, fetches and caches slides via `getHomepageBanner`
  - `BannerCarousel.tsx` — Client Component, handles Embla carousel state and interactions
  - This split was required to resolve a `"server-only"` boundary violation caused by having `"use client"` and server data fetching in the same file
- `FETCH_PRODUCTS` — `first:` is now a `$firstProducts` variable passed from `serverConfig.limits.productsPerPage` instead of a hardcoded literal
- `FETCH_COLLECTION_BY_HANDLE` — `first:` is now a `$productsFirst` variable passed from `serverConfig.limits.collectionProductsPerPage`
- `FETCH_PRODUCT_BY_HANDLE` — `collections(first:)` is now a `$firstCollections` variable
- `/api/revalidate` — now reads `serverConfig.webhookSecret` instead of accessing `process.env.SHOPIFY_WEBHOOK_SECRET` directly, consistent with the centralized config pattern
- Banner images now load with `quality={85}` (down from `quality={100}`) — visually identical at a fraction of the payload size
- First banner slide uses `priority` + `loading="eager"` for LCP; subsequent slides use `loading="lazy"` to avoid loading off-screen images on page load
- `placeholder="blur"` activated on banner images — `blurDataURL` was previously set but ignored because the placeholder prop was missing

### Fixed
- `preload` prop removed from `<Image>` — not a valid Next.js Image prop, was silently ignored
- Embla `selectedScrollSnap` now synced to React state via `useEffect` on the `"select"` event — previously `current` was always `0` regardless of which slide Embla was showing, breaking dot indicator highlighting
- Missing `key` prop on `.embla__slide` elements
- Banner slide `<div>` wrapper around `<Image fill>` had no `relative` positioning or dimensions, causing the image to have no reference box to fill against

---

## Reusability & Multi-Client Readiness (June 2026)

### Added
- `config/client.config.ts` — browser-safe configuration (store name, locale, currency, menu handles, feature flags). Safe to import from both server and client components
- `config/server.config.ts` — server-only configuration with `import "server-only"` guard (API credentials, webhook secret, cache TTL profiles, query limits). Never ships to the browser bundle
- `/api/revalidate` — Shopify webhook endpoint with HMAC signature verification. Calls `revalidateTag()` on `products/*`, `collections/*`, and `inventory_levels/update` topics for instant cache invalidation without waiting for TTL expiry
- Cart note UI — customers can attach a note to their order at checkout
- `lib/schema/search.ts` — `PREDICTIVE_RESULT_SCHEMA` and `SEARCH_RESULT_PAGE_SCHEMA` extracted out of `lib/shopify/api/search.ts`
- `types/search.ts` — `SEARCH_RESULT_PAGE_TYPE` extracted and colocated with other domain types
- Dedicated metaobject type definitions in `types/metaobjects.ts`

### Changed
- Cart server actions (`addToCart`, `removeItem`, `updateItem`, `applyDiscountCode`, `removeDiscountCode`, `updateCartNote`) now accept typed parameters directly instead of `FormData` — removes unnecessary serialization overhead for actions called programmatically from JavaScript
- `FETCH_PRODUCT_BY_HANDLE` reduced from `images(first: 30)` to `images(first: 10)` — reduces GraphQL payload on every PDP
- `getProductRecommendation` now keys off `productHandle` instead of `productId` — removes dependency on the prior product fetch result, enabling `Promise.all` parallel fetching on the PDP
- `useMediaQuery` moved from `lib/responsiveness/` to `hooks/` — hooks belong in `hooks/`, not `lib/`
- Collection caching switched from composite cache tags (which embedded sort/filter params) to stable `collection-{handle}` tags — prevents unbounded cache key growth with every unique filter/sort combination
- Account and protected layout routes now rely entirely on `proxy.ts` for auth redirection — removed duplicate `customerAccessToken` cookie checks that were manually repeated per page
- Store logo in `Header.tsx` now rendered via `StoreLogo.tsx` component sourced from `clientConfig.store.name` instead of hardcoded `<span>`
- `getSocialMedias` response shape corrected: `error`/`warning` keys renamed to `errors`/`warnings` to match the `API_RESPONSE<T>` contract used everywhere else

### Fixed
- `getCartAction` was calling `getCart(cartId)` twice for the same ID — now uses the result of the first call
- `console.log` debug statements (including raw payload dumps) replaced with `console.error` across the API layer
- `setUpdatingVariant(null)` in `Cart.tsx` moved to `finally` block — previously left the loading state stuck on any failed update
- Predictive search result list URL malformed

---

## Account & Customer Management (June 2026)

### Added
- Full account dashboard with order history, address book, and customer profile
- Address CRUD — create, update, remove, and set-default, with Zod input validation on all operations
- Order list with color-coded fulfillment and payment status indicators
- Customer logout with `customerAccessToken` cookie invalidation
- Toast notification system *(in progress)*
- `AuthContext` for client-side customer auth state

### Changed
- `API_RESPONSE<T>` return types standardized across all address and logout server actions
- Action files renamed to the consistent `action.ts` convention
- Customer Zod schema and `GET_CUSTOMER_INFO` GraphQL query refactored for clarity

### Fixed
- Address edit modal not pre-populating with existing address data
- `setDefaultAddressAction` failing when chained after `createAddressAction`
- Account dashboard layout issues on mobile
- Unreachable `setError` code path

---

## Cart & Checkout (May–June 2026)

### Added
- Dedicated full cart page (`/cart`) — separate from the slide-out cart drawer
- Discount code application and removal with dedicated Zod schema and GraphQL fragment
- Stale cart detection — invalid cart IDs are cleared from cookies and a new cart is created on next add
- Lazy cart creation — no Shopify cart is created until the customer's first `addToCart` action
- `proxy.ts` route guard for `/account` routes
- Customer identity attached to cart when logged in

### Fixed
- Cart slider (drawer) incorrectly rendering on the dedicated `/cart` page

---

## Authentication (May 2026)

### Added
- Login and signup pages
- Auth actions return structured error codes instead of raw messages — ready for i18n error mapping
- `formatLoginError` utility for human-readable login error display

### Fixed
- Stale form values flashing briefly when navigating away from login/signup mid-render

---

## Product Listing, Collections & Search (April–May 2026)

### Added
- Collection page with client-side sort and filter controls
- Dedicated search page with full results display
- Predictive search with "view all results" link
- Product slider component for horizontal product carousels
- Dynamic skeleton loading states for product lists

### Changed
- `ProductList` refactored to remove unnecessary `Suspense` wrappers
- Sort component rewritten for more flexible URL search param construction

### Fixed
- Incorrect price display for single-variant products
- Product listing card layout issues
- Search query string not clearing when navigating away from search
- Predictive search dropdown not closing on outside click
- `API_RESPONSE` type gaps and missing null guards on the product page

---

## Product Detail Page (April 2026)

### Added
- Product Detail Page — image gallery, variant/swatch selector, quantity stepper, add-to-cart
- Product image carousel
- Product recommendations section

### Fixed
- Product image and swatch selector interaction bugs
- Cart, form, and carousel conflicts on the PDP

---

## Foundational Setup (February–March 2026)

### Added
- Initial project scaffold from `create-next-app`
- Shopify Storefront API client with GraphQL queries, mutations, and fragments
- Product and customer TypeScript types
- Zod validation layer — all Shopify API responses are parsed and validated before use
- Header, navigation, and cart slider (drawer) UI
- Homepage product listing with sort controls
- Klaviyo newsletter subscription integration in the footer
- Predictive search bar (initial implementation)

### Changed
- Cart state management moved into React Context with loading indicators
- `unstable_cache` usage migrated to the newer `"use cache"` directive
- All `<img>` tags replaced with `next/image` for automatic optimization

### Fixed
- File naming inconsistencies in early commits
- A blocking production build issue
- Mobile search bar animation glitch
- Header layout and spacing adjustments

---

## Known Issues

- **Storefront API has no `trackInventory` field** — low stock messaging is not possible through the Storefront API; this data is only available via the Admin API.
- **Admin → Storefront API replication lag** — Shopify propagates Admin API writes to the Storefront API asynchronously. Even with `revalidateTag()` firing instantly, a fresh Storefront API read immediately after an edit can return stale data for ~1–2 minutes. This is a Shopify platform constraint, not a bug in the cache layer.
- **`metaobjects/update` webhook not yet handled** — banner and featured collection changes in Shopify Admin will not trigger immediate cache invalidation. The `/api/revalidate` route needs a `metaobjects/update` case added to call `revalidateTag("homepage-banner")` and `revalidateTag("featured-collections")`.
- **Toast notification system incomplete** — `AuthContext` and some account actions have toast calls wired up but the UI implementation is not finished.