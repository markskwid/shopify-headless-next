import Filters from "@/components/Filters";
import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { Sort } from "@/components/ProductList/Sort";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import {
  getCollectionByHandle,
  getFilters,
} from "@/lib/shopify/api/collections";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{
    available?: string;
    minPrice?: string;
    maxPrice?: string;
    orderBy?: string;
    order?: string;
  }>;
}
export default async function Collection({ params, searchParams }: Props) {
  const { handle } = await params;
  const { available, minPrice, maxPrice, orderBy, order } = await searchParams;

  const sortKey =
    orderBy === "name" ? "TITLE" : orderBy === "price" ? "PRICE" : "CREATED";
  const reverse = order === "desc";

  if (!handle) {
    return notFound();
  }

  const activeFilter = [];

  if (available) {
    activeFilter.push({
      available: available === "true",
    });
  }

  if (minPrice || maxPrice) {
    activeFilter.push({
      price: {
        min: Number(minPrice ?? 0),
        max: Number(maxPrice ?? 999999),
      },
    });
  }

  const [collection, filters] = await Promise.all([
    getCollectionByHandle(handle, activeFilter, sortKey, reverse),
    getFilters(handle),
  ]);

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
          <div className="mb-5 lg:float-left lg:mb-0 lg:mr-5 lg:clear-both lg:w-[20%] lg:sticky lg:top-20">
            <Filters
              filters={filters.data ?? []}
              searchParams={{ available, maxPrice, minPrice }}
            />
          </div>
          {collection.data?.products.nodes &&
          collection.data?.products.nodes.length > 0 ? (
            <>
              <div className="mb-5 flex lg:justify-end">
                <Sort />
              </div>

              <ProductList
                products={collection.data?.products.nodes ?? []}
                isSlider={false}
                isCollection={true}
              />
            </>
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
