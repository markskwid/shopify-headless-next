import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import { searchResultsPage } from "@/lib/shopify/api/search";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ q?: string }>;
}
export default async function Search({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    console.log("No query input");
    return notFound();
  }

  const searchResult = await searchResultsPage(q);

  return (
    <PageWrapper>
      <>
        <h1 className="text-4xl font-bold mb-2">Search Result For: {q}</h1>
        <span className="mb-10">
          Result count: {searchResult.data?.totalCount} products
        </span>
        <ProductList
          products={searchResult.data?.products ?? []}
          isSlider={false}
          isCollection={false}
        />
      </>
    </PageWrapper>
  );
}
