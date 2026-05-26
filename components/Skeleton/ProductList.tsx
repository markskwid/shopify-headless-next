interface Props {
  productSize?: number;
  isCollection?: boolean;
}
export const ProductListSkeleton = ({ productSize, isCollection }: Props) => {
  const PAGE_SIZE = productSize ?? 12;

  return (
    <div
      className={
        isCollection
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"
      }
    >
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <div key={index} className="group animate-pulse min-h-62">
          <div className="w-full min-h-98 bg-gray-300 rounded-md"></div>
          <div className="text-center font-semibold mt-2 text-xl h-8 bg-gray-300"></div>

          <div className="text-center nline-block my-1 font-semibold text-lg max-w-1/2 mx-auto h-10 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
