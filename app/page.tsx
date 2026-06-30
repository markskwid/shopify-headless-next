import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import { getFeaturedCollections } from "@/lib/shopify/api/collections";
import { getProducts } from "@/lib/shopify/api/products";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sort } from "@/components/ProductList/Sort";
import CategoryBox from "@/components/Homepage/CategoryBox";
import Banner from "@/components/Homepage/Banner";

async function ProductSection({
  sortKey,
  reverse,
}: {
  sortKey: string;
  reverse: boolean;
}) {
  const products = await getProducts(sortKey, reverse);
  return (
    <>
      <ProductList
        products={products.data ?? []}
        isSlider={false}
        isCollection={false}
      />
    </>
  );
}

async function CollectionsSection() {
  const collections = await getFeaturedCollections();

  return (
    <section className="mt-20" aria-label="Featured Categories">
      <div className="flex-start items-start flex flex-col space-y-10 lg:flex-row lg:space-x-5">
        {collections.data &&
          collections.data.map((collection) => (
            <CategoryBox
              key={collection.title}
              title={collection.title}
              imgUrl={collection.image?.url || ""}
              description={collection.description || ""}
              handle={collection.handle}
              altText={collection.image?.altText || ""}
            />
          ))}
      </div>
    </section>
  );
}

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
        : "CREATED_AT";
  const reverse = params.order === "desc";

  return (
    <PageWrapper>
      <>
        <Banner />
        <>
          <div className="w-full mb-5 flex justify-end items-center px-2">
            <Sort />
          </div>
          <Suspense
            key={`${sortKey}-${reverse}`}
            fallback={<ProductListSkeleton isCollection={false} />}
          >
            <ProductSection sortKey={sortKey} reverse={reverse} />
          </Suspense>
        </>

        <Suspense
          fallback={
            <div className="mt-20 h-52 animate-pulse bg-neutral-200 rounded-md" />
          }
        >
          <CollectionsSection />
        </Suspense>
      </>
    </PageWrapper>
  );
}
