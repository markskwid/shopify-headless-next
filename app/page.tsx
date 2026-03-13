import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListSkeleton } from "@/components/Skeleton/ProductListSkeleton";
import { getFeaturedCollections } from "@/lib/shopify/api/collections";
import { getProducts } from "@/lib/shopify/api/products";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ orderBy?: string; order?: string }>;
}) {
  const params = await searchParams;
  const sortKey =
    params.orderBy === "name"
      ? "TITLE"
      : params.orderBy === "price"
        ? "PRICE"
        : undefined;
  const reverse = params.order === "desc";
  const [products, collections] = await Promise.all([
    getProducts(sortKey, reverse),
    getFeaturedCollections(),
  ]);

  return (
    <PageWrapper>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products.data ?? []} />
      </Suspense>
    </PageWrapper>
  );
}
