// components/Skeleton/ProductList.tsx

type ProductListSkeletonProps = {
  isCollection?: boolean;
  count?: number;
};

export const ProductCardSkeleton = () => {
  return (
    <div className="group w-full z-10 animate-pulse">
      <div className="aspect-3/4 w-full rounded-md bg-neutral-300" />

      <div className="mt-3 flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-5 w-5 rounded-full bg-neutral-300 border border-neutral-200"
          />
        ))}
      </div>

      <div className="mt-4 mx-auto h-6 w-3/4 rounded-md bg-neutral-300" />

      <div className="mt-3 mx-auto h-5 w-1/2 rounded-md bg-neutral-300" />
    </div>
  );
};

export const ProductListSkeleton = ({
  isCollection = false,
  count = 8,
}: ProductListSkeletonProps) => {
  return (
    <section aria-label="Loading product listing" className="min-h-screen">
      <div
        className={
          isCollection
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"
        }
      >
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
