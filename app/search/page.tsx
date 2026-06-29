import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { Sort } from "@/components/ProductList/Sort";
import { searchResultsPage } from "@/lib/shopify/api/search";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{ q?: string; orderBy: string; order: string }>;
}
export default async function Search({ searchParams }: Props) {
  const { q, order, orderBy } = await searchParams;

  if (!q) {
    console.error("No query input");
    return notFound();
  }

  const sortKey = orderBy === "price" ? "PRICE" : orderBy === "createdAt" ? "CREATED_AT" : "RELEVANCE";
  const reverse = order === "desc";

  const searchResult = await searchResultsPage(q, sortKey, reverse);

  return (
    <PageWrapper>
      <>
        <h1 className="text-4xl font-bold mb-2">Search Result For: {q}</h1>
        <span className="mb-10">
          Result count: {searchResult.data?.totalCount} products
        </span>
        <div className="mb-5 flex lg:justify-end">
          <Sort />
        </div>

        <ProductList
          products={searchResult.data?.products ?? []}
          isSlider={false}
          isCollection={false}
        />
      </>
    </PageWrapper>
  );
}
