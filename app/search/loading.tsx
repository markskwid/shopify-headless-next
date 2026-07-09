import { PageWrapper } from "@/components/PageWrapper";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="h-10 w-64 rounded-md bg-neutral-300 mb-4" />
        <div className="h-5 w-48 rounded-md bg-neutral-300 mb-10" />
        <div className="mb-5 flex lg:justify-end">
          <div className="h-10 w-full sm:w-48 rounded-full bg-neutral-300" />
        </div>

        <ProductListSkeleton isCollection={false} count={8} />
      </div>
    </PageWrapper>
  );
}
