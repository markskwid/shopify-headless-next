import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { getFeaturedCollections } from "@/lib/shopify/api/collections";
import { getProducts } from "@/lib/shopify/api/products";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ orderBy?: string; order?: string }>;
}) {
  const params = await searchParams;
  const sortKey = params.orderBy ?? "TITLE";
  const reverse = params.order === "desc";
  const [products, collections] = await Promise.all([
    getProducts(sortKey, reverse),
    getFeaturedCollections(),
  ]);

  return (
    <PageWrapper>
      <ProductList products={products.data ?? []} />
    </PageWrapper>
  );
}
