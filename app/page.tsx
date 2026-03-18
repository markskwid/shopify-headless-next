import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import { getFeaturedCollections } from "@/lib/shopify/api/collections";
import { getProducts } from "@/lib/shopify/api/products";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

async function ProductSection({
  sortKey,
  reverse,
}: {
  sortKey: string;
  reverse: boolean;
}) {
  const products = await getProducts(sortKey, reverse);
  return <ProductList products={products.data ?? []} />;
}

async function CollectionsSection() {
  const collections = await getFeaturedCollections();

  return (
    <section className="mt-20" aria-label="Featured Categories">
      <div className="flex-start items-start flex flex-col space-y-10 lg:flex-row lg:space-x-5">
        {collections.data &&
          collections.data.map((collection) => (
            <Link
              key={collection.title}
              href="#"
              className="group category w-full lg:w-1/2"
            >
              <article>
                <figure className="relative min-h-52 lg:min-h-180 w-full overflow-hidden rounded-md">
                  <Image
                    fill
                    quality={100}
                    className="object-cover object-center scale-110 transition-transform duration-200 ease-out group-hover:scale-100"
                    src={collection.image?.url ?? ""}
                    alt={collection.title}
                    sizes="(max-width: 768px) 100vw, 400px"
                    placeholder="blur"
                    blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                  />
                </figure>
                <h3 className="mt-5 font-bold text-xl text-neutral-600!">
                  {collection.title}
                </h3>
                <p className="text-neutral-500! text-sm">
                  {collection.description}
                </p>
              </article>
            </Link>
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
  const params = await searchParams; // Next 15 requires awaiting searchParams

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
        <Suspense
          key={`${sortKey}-${reverse}`}
          fallback={<ProductListSkeleton />}
        >
          <ProductSection sortKey={sortKey} reverse={reverse} />
        </Suspense>

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
