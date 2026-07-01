# Shopify Headless Storefront — Next.js

A reusable, production-grade headless Shopify storefront built with Next.js 16 (App Router), the Shopify Storefront API, and Next.js's native caching primitives (`"use cache"`, `cacheLife`, `cacheTag`). Designed to be cloned and re-configured per client without touching application code.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, `cacheComponents`) |
| Commerce | Shopify Storefront API (GraphQL) |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Language | TypeScript |
| Carousel | Embla Carousel |
| Auth | Shopify Customer Account tokens via `proxy.ts` |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your store's credentials:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) below for what each value does.

### 3. Set up Shopify Metaobjects

This storefront pulls homepage content directly from Shopify — no CMS required. You need to create the following metaobject definitions in **Shopify Admin → Content → Metaobjects** before the homepage will render correctly:

**`homepage_banner`** (one entry per slide, supports multiple)

| Field Name | Key | Type |
|---|---|---|
| Title | `banner_title` | Single line text |
| Description | `banner_description` | Single line text |
| Button Title | `button_title` | Single line text |
| Button URL | `button_url` | URL |
| Image | `banner_image` | File (image) |

> The metaobject **type** must match `NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE` in your `.env.local` (default: `homepage_banner`). Field **keys** must match exactly — the normalizer maps directly to these names and returns `null` silently if a key doesn't exist.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm run start
```

---

## Environment Variables

All client-specific configuration is centralized in [`config/client.config.ts`](./config/client.config.ts) and [`config/server.config.ts`](./config/server.config.ts), sourced from environment variables. **Onboarding a new client should only require editing `.env.local` — not application code.**

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | ✅ | Your `*.myshopify.com` domain |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN` | ✅ | Storefront API public access token |
| `SHOPIFY_API_VERSION` | – | Storefront API version (default: `2026-01`) |
| `SHOPIFY_WEBHOOK_SECRET` | ✅ | HMAC signing secret for `/api/revalidate` webhook verification |
| `NEXT_PUBLIC_STORE_NAME` | – | Displayed in the header logo |
| `NEXT_PUBLIC_LOCALE` | – | BCP 47 locale code for price formatting (default: `en-US`) |
| `NEXT_PUBLIC_CURRENCY` | – | Fallback currency code (default: `USD`) |
| `NEXT_PUBLIC_MAIN_MENU_HANDLE` | – | Shopify menu handle for primary nav (default: `main-menu`) |
| `NEXT_PUBLIC_FOOTER_MENU_HANDLE` | – | Shopify menu handle for footer nav (default: `footer`) |
| `NEXT_PUBLIC_BANNER_BLUR_URL` | – | Base64 blur placeholder shown while banner image loads |
| `NEXT_PUBLIC_HOMEPAGE_BANNER_TYPE` | – | Metaobject type for homepage banner slides (default: `homepage_banner`) |
| `NEXT_PUBLIC_FEATURED_COLLECTIONS_TYPE` | – | Metaobject type for featured collections (default: `featured_collections`) |
| `NEXT_PUBLIC_PRODUCTS_PER_PAGE` | – | Products shown on homepage listing (default: `12`) |
| `NEXT_PUBLIC_COLLECTION_PRODUCTS_PER_PAGE` | – | Products per collection page (default: `15`) |
| `NEXT_PUBLIC_CART_LINES_LIMIT` | – | Max cart line items fetched (default: `50`) |
| `NEXT_PUBLIC_PRODUCT_IMAGES_LIMIT` | – | Images fetched per product (default: `10`) |
| `NEXT_PUBLIC_PRODUCT_VARIANTS_LIMIT` | – | Variants fetched per product (default: `100`) |
| `NEXT_PUBLIC_RECOMMENDATIONS_LIMIT` | – | Recommended products shown on PDP (default: `8`) |
| `NEXT_PUBLIC_FEATURE_WISHLIST` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_REVIEWS` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_PREDICTIVE_SEARCH` | – | `true`/`false` feature flag |
| `KLAVIYO_LIST_ID` | – | Klaviyo list ID for newsletter signups |
| `KLAVIYO_API_KEY` | – | Klaviyo private API key |

> `NEXT_PUBLIC_*` values are exposed to the browser bundle. Never put secrets (webhook secret, Klaviyo API key) behind that prefix — keep them in `config/server.config.ts` only.

---

## Project Structure

```
app/
  (auth)/                Login, register, logout — server actions
  (address)/             Customer address CRUD — server actions
  (cart)/                Cart mutations (add/update/remove/discount/note) — server actions
  (protected)/           Routes gated by proxy.ts (e.g. /account)
  api/
    revalidate/          Shopify webhook receiver → on-demand cache invalidation
    subscribe/           Klaviyo newsletter signup endpoint
  product/[handle]/      PDP with generateMetadata for SEO
  collection/[handle]/   PLP with filters, sort, and pagination
  search/                Full search + predictive search
  cart/                  Dedicated cart page

components/
  Homepage/
    Banner/
      Banner.tsx         Server component — fetches slides from Shopify
      BannerCarousel.tsx Client component — Embla carousel, dot indicators
  ...                    Other components grouped by feature area

context/                 React context (Cart, Auth, UI state) — client-side only
hooks/                   Reusable client hooks (useMediaQuery, etc.)

lib/
  shopify/
    client.ts            Storefront API client instance (sourced from serverConfig)
    api/                 One file per domain — every function owns its own "use cache"
  schema/                Zod schemas for every Shopify API response shape

graphql/
  queries.ts             All GraphQL query strings
  mutations.ts           All GraphQL mutation strings
  fragments.ts           Shared fragments (ProductFields, CartItem, etc.)

types/                   Domain TypeScript types, decoupled from raw Shopify shapes
utils/
  normalizeErrors.ts     Unified error normalizer for GraphQL, Zod, and runtime errors
  normalizeBannerFields.ts  Maps Shopify metaobject field array → typed BANNER_TYPE
  formatPricing.ts       Locale-aware price formatter

config/
  client.config.ts       Browser-safe config — locale, store name, feature flags
  server.config.ts       Server-only config — API credentials, cache TTLs, limits

proxy.ts                 Next.js 16 request interception — auth guard for /account/*
```

---

## Caching Strategy

This project uses Next.js's `cacheComponents` model — **not** route-level `export const revalidate`. Every data-fetching function owns its cache declaration:

```ts
export const getProductByHandle = async (handle: string) => {
  "use cache";
  cacheLife(serverConfig.cache.products); // configured TTL profile
  cacheTag(`product-${handle}`);          // targeted invalidation tag
  // ...
};
```

Cache TTL profiles are defined in `serverConfig.cache` and map to Next.js's built-in profiles (`"minutes"`, `"hours"`, `"weeks"`, etc.).

### On-demand invalidation via Shopify Webhooks

`/api/revalidate` receives signed webhook events from Shopify and calls `revalidateTag()` immediately — no waiting for the TTL to expire.

**Handled webhook topics:**

| Topic | Tags Invalidated |
|---|---|
| `products/create`, `products/update`, `products/delete` | `products`, `product-{handle}` |
| `collections/create`, `collections/update`, `collections/delete` | `collections`, `collection-{handle}` |
| `inventory_levels/update` | `products` |

**To enable in Shopify Admin:**
1. Go to **Settings → Notifications → Webhooks**
2. Add subscriptions for each topic above
3. Point each to `https://your-domain.com/api/revalidate`
4. Set the signing secret to match `SHOPIFY_WEBHOOK_SECRET` in your `.env.local`

> **Known limitation:** Shopify replicates Admin API writes to the Storefront API asynchronously. Even with instant `revalidateTag()` firing, a fresh Storefront API read immediately after an edit can still return slightly stale data for ~1–2 minutes. This is a Shopify platform behavior — not a bug in the cache layer.

---

## Homepage Banner

The hero banner is fully managed from **Shopify Admin → Content → Metaobjects**. No code deployments are needed to update banner copy, images, or CTA links.

- Create one metaobject entry per slide
- Slides are rendered in the order they appear in Shopify
- The carousel auto-hides navigation controls when only one slide is present
- Uses Embla Carousel with looping and dot indicators
- First slide loads with `priority` and `eager` for LCP performance; subsequent slides lazy-load

See [Set up Shopify Metaobjects](#3-set-up-shopify-metaobjects) for the required field structure.

---

## Authentication

`proxy.ts` (Next.js 16's successor to `middleware.ts`) checks for a `customerAccessToken` cookie and redirects unauthenticated requests away from protected routes (`/account/*`). Update the `matcher` config in `proxy.ts` to protect additional routes.

---

## Adding a New Client

1. Clone this repository
2. `cp .env.example .env.local` and fill in the store's credentials
3. Create the required metaobject definitions in Shopify Admin (see [Set up Shopify Metaobjects](#3-set-up-shopify-metaobjects))
4. Set up Shopify webhook subscriptions (see [On-demand invalidation](#on-demand-invalidation-via-shopify-webhooks))
5. Adjust feature flags in `.env.local` to match the client's scope
6. Deploy

No application code should need to change for a standard storefront. If it does, consider whether that value belongs in `config/` instead.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Status

This project is **in active development**. See [`CHANGES.md`](./CHANGES.md) for a full changelog.