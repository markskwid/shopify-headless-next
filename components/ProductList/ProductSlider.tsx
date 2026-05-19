"use client";
import { PRODUCT_LISTING_TYPE } from "@/types/product";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "../ProductCard/ProductCard";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect, useState } from "react";

export const ProductSlider = ({
  products,
}: {
  products: PRODUCT_LISTING_TYPE[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  //-- useEffect for disabling buttons on start and end of slider --//
  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on("select", update);
    emblaApi.on("init", update);
  }, [emblaApi]);

  return (
    <section aria-label="Product Listing" className="relative">
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white ${prevDisabled ? "opacity-0" : "opacity-100"} shadow rounded-full p-3`}
        disabled={prevDisabled}
      >
        <LuChevronLeft size={25} />
      </button>
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              className="flex-none w-full sm:w-[50%] md:w-[50%] lg:w-[25%]"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white ${nextDisabled ? "opacity-0" : "opacity-100"} shadow rounded-full p-3`}
        disabled={nextDisabled}
      >
        <LuChevronRight size={25} />
      </button>
    </section>
  );
};
