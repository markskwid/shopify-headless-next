import { PageWrapper } from "@/components/PageWrapper";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="mb-10">
          <div className="h-10 w-64 rounded-md bg-neutral-300 mb-4" />
          <div className="h-5 w-full max-w-2xl rounded-md bg-neutral-300" />
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 w-full sm:w-48 rounded-full bg-neutral-300" />

          <div className="flex gap-3">
            <div className="h-10 w-28 rounded-full bg-neutral-300" />
            <div className="h-10 w-28 rounded-full bg-neutral-300" />
          </div>
        </div>

        <ProductListSkeleton isCollection={true} count={9} />
      </div>
    </PageWrapper>
  );
}
