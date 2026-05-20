import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { searchResultsPage } from "@/lib/shopify/api/search";
import { notFound } from "next/navigation";

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
  const products = searchResult.data;

  return (
    <PageWrapper>
      <>
        <h1 className="text-4xl font-bold mb-10">Search Result For: {q}</h1>
        <ProductList products={products ?? []} isSlider={false} />
      </>
    </PageWrapper>
  );
}
