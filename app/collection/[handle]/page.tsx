import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { getCollectionByHandle } from "@/lib/shopify/api/collections";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ handle: string }>;
}
export default async function Collection({ params }: Props) {
  const { handle } = await params;

  if (!handle) {
    return notFound();
  }

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return notFound();
  }

  return (
    <PageWrapper>
      <>
        <h1 className="text-5xl font-bold mb-5">{collection.data?.title}</h1>
        {collection.data?.description && (
          <p className="lg:max-w-1/2 text-gray-600!">
            {collection.data.description}
          </p>
        )}

        <div className="mt-10">
          {collection.data?.products.nodes &&
          collection.data?.products.nodes.length > 0 ? (
            <ProductList
              products={collection.data?.products.nodes ?? []}
              isSlider={false}
            />
          ) : (
            <h2 className="font-bold text-xl">
              We're working on adding products in this collection. Stay tuned!
            </h2>
          )}
        </div>
      </>
    </PageWrapper>
  );
}
