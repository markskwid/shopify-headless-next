const PAGE_SIZE = 12;

export const ProductListSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-start items-start space-x-2 space-y-5">
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <div
          key={index}
          className="group md:flex-[48%] lg:flex-[24%] z-10 animate-pulse min-h-62"
        >
          <div className="w-full min-h-98 bg-gray-300 rounded-md"></div>
          <div className="text-center font-semibold mt-2 text-xl h-8 bg-gray-300"></div>

          <div className="text-center nline-block my-1 font-semibold text-lg max-w-1/2 mx-auto h-10 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
