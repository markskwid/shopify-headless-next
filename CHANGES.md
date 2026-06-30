# Changelog

All notable changes to this project are documented here, grouped by feature area and ordered newest first. This project is in active development — entries reflect the actual commit history on `develop`.

## [Unreleased] — Reusability & Multi-Client Readiness (June 2026)

### Added
- `config/client.config.ts` and `config/server.config.ts` — centralized, env-driven configuration split by browser/server trust boundary, replacing scattered hardcoded values (store name, locale, menu handles, image limits, cache TTLs)
- `/api/revalidate` — Shopify webhook receiver with HMAC signature verification, triggers `revalidateTag()` on `products/*`, `collections/*`, and `inventory_levels/update` topics for on-demand cache invalidation
- Cart note UI — customers can now attach a note to their cart
- `lib/schema/search.ts` and `types/search.ts` — predictive search and search result page schemas/types extracted out of `lib/shopify/api/search.ts`
- Dedicated `metaobjects` type definitions

### Changed
- Cart server actions (`addToCart`, `updateItem`, `removeItem`, etc.) now accept typed parameters directly instead of `FormData`, removing unnecessary serialization for actions that are only ever called programmatically
- `FETCH_PRODUCT_BY_HANDLE` now requests 10 images instead of 30, reducing over-fetch on the PDP
- `getProductRecommendation` now keys off `productHandle` instead of `productId`, removing a dependency on a prior fetch result and enabling parallel data loading on the product page
- `useMediaQuery` moved from `lib/responsiveness/` to `hooks/`, correcting its location to match its purpose as a React hook rather than a library utility
- Collection caching now uses stable, generic cache tags instead of composite tags built from sort/filter parameters, preventing unbounded cache key growth
- `app/(protected)/layout.tsx` and account routes now rely on `proxy.ts` for auth redirection instead of duplicating token checks per-page
- Store logo replaced hardcoded header text, now sourced from config
- `getSocialMedias` response shape corrected (`error`/`warning` → `errors`/`warnings`) for consistency with the rest of the `API_RESPONSE<T>` contract

### Fixed
- Duplicate `getCart` calls inside `getCartAction` — was fetching the same cart twice per request
- `console.log` debug statements replaced with `console.error` across API layer
- `setUpdatingVariant` loading state in `Cart.tsx` now clears via `finally`, preventing a stuck loading state on failed updates
- Predictive search result list URL bug
- `SOCIAL_MEDIA_RESPONSE_SCHEMA` — removed an incorrect `.nullable()`

---

## Account & Customer Management (June 2026)

### Added
- Full account dashboard: order history, address book, customer info
- Address CRUD — create, update, remove, set-default, with chaining logic and Zod validation
- Order list with color-coded status indicators
- Customer logout flow with access token invalidation
- Toast notification system (in progress)
- `AuthContext` for client-side auth state

### Changed
- Standardized `API_RESPONSE<T>` return types across address and logout actions
- Renamed action files to a consistent `action.ts` naming convention
- Customer schema and `GET_CUSTOMER_INFO` query refactored for clarity

### Fixed
- Address modal form not pre-populating on edit
- `setDefaultAddressAction` failing on `createAddressAction` chaining
- Account dashboard responsiveness issues
- Unreachable `setError` code path

---

## Cart & Checkout Flow (May–June 2026)

### Added
- Full cart page (separate from the slide-out cart drawer)
- Discount code application and removal, with dedicated schema and GraphQL fragment
- Stale cart detection and handling
- Lazy cart creation — cart is only created in Shopify on first `addToCart`, not on page load
- `proxy.ts` (then `middleware.ts`) gating `/account` routes
- Customer identity attached to cart for logged-in users

### Fixed
- Cart slider incorrectly showing on the dedicated cart page

---

## Authentication (May 2026)

### Added
- Login and signup pages
- Login/signup actions refactored to communicate via error codes instead of raw messages, enabling proper i18n-ready error handling
- `formatLoginError` utility

### Fixed
- Stale value flash in login/signup forms when navigating away mid-render

---

## Product Listing, Collections & Search (April–May 2026)

### Added
- Collection page with sorting and filtering
- Dedicated search page with predictive search and "view all results"
- Product slider component
- Dynamic product list skeleton loading states

### Changed
- `ProductList` refactored to remove unnecessary `Suspense` boundaries
- Sort component refactored for more flexible URL param construction

### Fixed
- Pricing display bug for single-variant products
- Product listing card layout issues
- Search query not clearing on navigation
- Search result dropdown not closing on outside click
- `API_RESPONSE` type inconsistencies and missing null guards on the product page

---

## Product Detail Page (April 2026)

### Added
- Product Detail Page (PDP) — images, variant/swatch selector, quantity stepper, add-to-cart
- Image carousel for product galleries

### Fixed
- Product image and swatch selector bugs
- Cart, form, and carousel interaction issues on the PDP

---

## Foundational Setup (February–March 2026)

### Added
- Initial project scaffold (`create-next-app`)
- Shopify Storefront API client, GraphQL queries/fragments
- Product and customer TypeScript types
- Zod validation layer with inferred types for API responses
- Header, navigation, cart slider UI
- Homepage product sorting
- Klaviyo newsletter integration in the footer
- Search bar (initial implementation)

### Changed
- Cart logic moved into React Context
- `unstable_cache` usage migrated to `"use cache"` directive
- Replaced `<img>` tags with `next/image` throughout

### Fixed
- File naming inconsistencies
- A blocking issue affecting production builds
- Mobile search bar animation bug
- Header layout adjustments

---

## Known Issues

- **Storefront API has no `trackInventory` field exposed** — there's currently no way to detect or display "low stock" messaging on the storefront, since this data isn't available through the Storefront API (only Admin API).
- **Admin → Storefront API replication lag** — Shopify replicates writes from the Admin API to the Storefront API asynchronously. Even with `revalidateTag()` firing instantly via the `/api/revalidate` webhook, a fresh read immediately after a product/collection edit can occasionally still return stale data for up to ~1–2 minutes. This is a Shopify platform behavior and not fixable from the application layer.