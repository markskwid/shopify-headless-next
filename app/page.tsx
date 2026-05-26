import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import { getFeaturedCollections } from "@/lib/shopify/api/collections";
import { getProducts } from "@/lib/shopify/api/products";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sort } from "@/components/ProductList/Sort";

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
      <ProductList products={products.data ?? []} isSlider={false} isCollection={false}/>
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
            <Link
              key={collection.title}
              href={`/collection/${collection.handle}`}
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
        <section
          aria-label="Homepage banner"
          className="rounded-md relative mb-10 w-full h-120 overflow-hidden"
        >
          <div className="w-full relative overflow-hidden h-full">
            <Image
              quality={100}
              loading="eager"
              preload={true}
              className="object-cover"
              alt="Banner image"
              fill
              src={
                "https://cdn.shopify.com/s/files/1/0805/0642/1503/files/banner-image-for-with-light-caramelize-and-wavy-background-with-shirts-and-jacket-that-will-be-featured-and-positioned-in-the-right-side.png?v=1773900624"
              }
            />
          </div>

          <div className="z-50 absolute max-w-100 left-10 top-1/2 -translate-y-1/2">
            <h1 className="font-bold text-5xl mb-2 leading-12">
              Launch your store in minutes.
            </h1>
            <p className="text-xl text-neutral-700!">
              Stripe-native. Built for the agentic future.
            </p>

            <Link
              className="mt-4 block text-center w-max rounded-full bg-black text-white! py-2 px-5"
              href={"#"}
            >
              Try it today
            </Link>
          </div>
        </section>
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
