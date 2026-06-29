import { PageWrapper } from "@/components/PageWrapper";
import { getCollections } from "@/lib/shopify/api/collections";
import Link from "next/link";
import Image from "next/image";

export default async function Collections() {
  const collections = await getCollections();

  return (
    <PageWrapper>
      <>
        <h1 className="text-5xl font-bold mb-5">All Collections</h1>
        {collections.data && (
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {collections.data.map((collection) => (
              <Link key={collection.handle} className="pointer-cursor" href={`/collection/${collection.handle}`}>
                <div className="relative w-full min-h-52">
                  {collection.image ? (
                    <Image
                      fill
                      quality={100}
                      className="object-cover object-center transition-transform duration-200 ease-out group-hover:scale-100"
                      src={collection.image?.url ?? ""}
                      alt={collection.title}
                      sizes="(max-width: 768px) 100vw, 400px"
                      placeholder="blur"
                      blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                    />
                  ) : (
                    <Image
                      fill
                      quality={100}
                      className="object-cover object-center transition-transform duration-200 ease-out group-hover:scale-100"
                      src={
                        "https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                      }
                      alt={collection.title}
                      sizes="(max-width: 768px) 100vw, 400px"
                      placeholder="blur"
                      blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                    />
                  )}
                </div>
                <p className="font-semibold text-xl mt-3">{collection.title}</p>
              </Link>
            ))}
          </section>
        )}
      </>
    </PageWrapper>
  );
}
