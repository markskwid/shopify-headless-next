import { PageWrapper } from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <section className="flex flex-col md:flex-row justify-start items-start md:space-x-12">
          {/* Product Images Skeleton */}
          <section className="w-full basis-full md:basis-[50%] lg:basis-[70%]">
            {/* Main Image */}
            <div className="relative h-[52vh] sm:h-[80vh] md:h-[60vh] lg:h-[90vh] w-full rounded-md bg-neutral-300" />

            {/* Thumbnails */}
            <div className="mt-4 flex space-x-2 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[15dvh] sm:h-[25dvh] md:h-[17dvh] lg:h-[20dvh] grow-0 shrink-0 basis-[25%] md:basis-[33.33%] lg:basis-[20%] rounded-md bg-neutral-300 border border-slate-300"
                />
              ))}
            </div>
          </section>

          {/* Product Information Skeleton */}
          <div className="mt-5 basis-full md:basis-[50%] md:mt-0 md:sticky md:top-20 w-full">
            {/* Product Title */}
            <div className="h-10 lg:h-16 w-4/5 rounded-md bg-neutral-300" />
            <div className="mt-3 h-10 lg:h-12 w-2/3 rounded-md bg-neutral-300" />

            {/* Description */}
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded-md bg-neutral-300" />
              <div className="h-4 w-11/12 rounded-md bg-neutral-300" />
              <div className="h-4 w-10/12 rounded-md bg-neutral-300" />
              <div className="h-4 w-8/12 rounded-md bg-neutral-300" />
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="h-5 w-28 rounded-md bg-neutral-300 mb-4" />

              <div className="flex items-center gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-12 w-12 rounded-full bg-neutral-300 border border-neutral-300"
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8">
              <div className="h-5 w-24 rounded-md bg-neutral-300 mb-5" />

              <div className="flex items-center flex-row md:flex-col lg:flex-row md:justify-center md:space-y-3 lg:space-y-0 space-x-5 md:space-x-0 lg:space-x-5">
                <div className="basis-1/2 h-13 md:basis-auto lg:basis-[50%] w-full md:max-w-52 lg:max-w-52 md:max-h-12 lg:h-13 rounded-full bg-neutral-300" />

                <div className="h-13 w-full grow rounded-full bg-neutral-300" />
              </div>
            </div>

            {/* Extra Product Info / Status Placeholder */}
            <div className="mt-8 space-y-3">
              <div className="h-4 w-2/3 rounded-md bg-neutral-300" />
              <div className="h-4 w-1/2 rounded-md bg-neutral-300" />
            </div>
          </div>
        </section>

        {/* Related Products Skeleton */}
        <section className="mt-20">
          <div className="h-10 w-72 rounded-md bg-neutral-300 mb-10" />

          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 basis-[80%] sm:basis-[45%] md:basis-[30%] lg:basis-[23%]"
              >
                <div className="aspect-3/4 w-full rounded-md bg-neutral-300" />

                <div className="mt-4 space-y-3">
                  <div className="h-5 w-4/5 rounded-md bg-neutral-300" />
                  <div className="h-5 w-1/2 rounded-md bg-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
