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

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

## Environment Variables

All client-specific configuration is centralized in [`config/client.config.ts`](./config/client.config.ts) and [`config/server.config.ts`](./config/server.config.ts), sourced from environment variables. **Onboarding a new client should only require editing `.env.local` — not application code.**

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | ✅ | Your `*.myshopify.com` domain |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN` | ✅ | Storefront API public access token |
| `SHOPIFY_API_VERSION` | – | Storefront API version (e.g. `2026-01`) |
| `SHOPIFY_WEBHOOK_SECRET` | ✅ | Used to verify Shopify webhook HMAC signatures at `/api/revalidate` |
| `NEXT_PUBLIC_STORE_NAME` | – | Displayed in the header/logo |
| `NEXT_PUBLIC_LOCALE` | – | e.g. `en-US`, used for price formatting |
| `NEXT_PUBLIC_CURRENCY` | – | Fallback currency code |
| `NEXT_PUBLIC_MAIN_MENU_HANDLE` | – | Shopify menu handle for primary nav |
| `NEXT_PUBLIC_FOOTER_MENU_HANDLE` | – | Shopify menu handle for footer nav |
| `NEXT_PUBLIC_BANNER_IMAGE_URL` | – | Homepage hero banner image |
| `NEXT_PUBLIC_BANNER_BLUR_URL` | – | Blur placeholder for the hero banner |
| `NEXT_PUBLIC_FEATURED_COLLECTIONS_TYPE` | – | Metaobject type used for featured collections |
| `NEXT_PUBLIC_FEATURE_WISHLIST` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_REVIEWS` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS` | – | `true`/`false` feature flag |
| `NEXT_PUBLIC_FEATURE_PREDICTIVE_SEARCH` | – | `true`/`false` feature flag |

> `NEXT_PUBLIC_*` values are exposed to the browser. Never put secrets behind that prefix — keep secrets in `config/server.config.ts` only.

## Project Structure

```
app/
  (auth)/            Login, register, logout — server actions
  (address)/         Customer address CRUD — server actions
  (cart)/            Cart mutations (add/update/remove/discount) — server actions
  (protected)/       Routes gated by proxy.ts (e.g. /account)
  api/
    revalidate/      Shopify webhook receiver → on-demand cache invalidation
    subscribe/       Newsletter signup endpoint
  product/[handle]/  PDP — static-friendly, generateMetadata for SEO
  collection/[handle]/  PLP with filters + sort
  search/            Storefront search
  cart/              Full cart page

components/          UI components, grouped by feature area
context/             React context (Cart, Auth, UI state) — client-side only
hooks/               Reusable client hooks (e.g. useMediaQuery)

lib/
  shopify/
    client.ts        Storefront API client instance
    api/              One file per domain (products, cart, customer, collections, etc.)
                       Every function here owns its own caching via "use cache"
  schema/             Zod schemas — validate every Shopify API response

graphql/
  queries.ts          All GraphQL queries
  mutations.ts        All GraphQL mutations
  fragments.ts        Shared fragments (ProductFields, CartItem, etc.)

types/                Domain-level TypeScript types (decoupled from raw Shopify shapes)
utils/                Pure helper functions (formatPrice, normalizeError, etc.)
config/
  client.config.ts    Browser-safe config (locale, store name, feature flags)
  server.config.ts    Server-only config (API credentials, cache TTLs, query limits)

proxy.ts              Next.js 16 request interception (formerly middleware.ts) — auth guard
```

## Caching Strategy

This project uses Next.js's `cacheComponents` model exclusively — **not** route-level `export const revalidate`. Caching is declared inside each data-fetching function:

```ts
export const getProductByHandle = async (handle: string) => {
  "use cache";
  cacheLife(serverConfig.cache.products); // TTL profile, see server.config.ts
  cacheTag(`product-${handle}`);          // for targeted invalidation
  // ...
};
```

### On-demand invalidation

`/api/revalidate` receives Shopify webhooks and calls `revalidateTag()` for the relevant resource the moment Shopify pushes a change, rather than waiting for the TTL to expire.

**To enable this in Shopify Admin:**
1. Go to **Settings → Notifications → Webhooks**
2. Add webhooks for `products/update`, `products/create`, `products/delete`, `collections/update`, and `inventory_levels/update`
3. Point each to `https://your-domain.com/api/revalidate`
4. Use the same signing secret as `SHOPIFY_WEBHOOK_SECRET`

> **Known limitation:** Shopify replicates writes from the Admin API to the Storefront API asynchronously. Even with instant `revalidateTag()` firing, a fresh Storefront API read immediately after an edit can occasionally still return slightly stale data for up to ~1–2 minutes. This is a Shopify platform behavior, not a bug in this cache layer.

## Authentication

`proxy.ts` (Next.js 16's replacement for `middleware.ts`) checks for a `customerAccessToken` cookie and redirects unauthenticated requests away from protected routes (currently `/account/*`). Update the `matcher` in `proxy.ts` to protect additional routes.

## Adding a New Client

1. Clone this repository
2. Copy `.env.example` → `.env.local` and fill in the new store's credentials
3. Set up the Shopify webhook subscriptions described above
4. Swap out homepage hero copy/imagery in `components/Homepage/Banner.tsx` (or migrate to a Shopify metaobject if you want it client-editable without a deploy)
5. Adjust feature flags in `.env.local` to match the client's scope
6. Deploy

No application code should need to change for a standard storefront. If it does, consider whether that value belongs in `config/` instead.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Status

This project is **in active development**. See [`CHANGES.md`](./CHANGES.md) for a running log of fixes and improvements.