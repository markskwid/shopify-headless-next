"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

type ProductImageType = {
  url: string;
  altText?: string | null;
  id: string;
};

export default function ProductImages({
  images,
  selectedImageIndex: initialSelectedImageIndex,
}: {
  images: ProductImageType[];
  selectedImageIndex: number | undefined;
}) {
  const [mainImageRef, mainImageApi] = useEmblaCarousel({ loop: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //Sync main image to thumbnail selection and vice versa
  useEffect(() => {
    if (!mainImageApi || !thumbApi) return;

    const onSelect = () => {
      const index = mainImageApi.selectedScrollSnap();
      setSelectedImageIndex(index);
      thumbApi?.scrollTo(index);
    };

    mainImageApi.on("select", onSelect);

    return () => {
      mainImageApi.off("select", onSelect);
    };
  }, [mainImageApi, thumbApi]);

  //Set initial selected image based on the variant selected
  useEffect(() => {
    if (!mainImageApi || !thumbApi || initialSelectedImageIndex === undefined)
      return;

    mainImageApi.scrollTo(initialSelectedImageIndex);
    thumbApi.scrollTo(initialSelectedImageIndex);
    setSelectedImageIndex(initialSelectedImageIndex);
  }, [initialSelectedImageIndex, mainImageApi, thumbApi]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    mainImageApi?.scrollTo(index);
    thumbApi?.scrollTo(index);
  };

  return (
    <section className="embla w-full basis-full md:basis-[50%] lg:basis-[70%]">
      {/* Main Image Slider */}
      <div
        className="w-full embla__viewport overflow-hidden"
        ref={mainImageRef}
      >
        <div className="embla__container flex touch-pan-y touch-pinch-zoom">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                className="embla__slide relative h-[52vh] sm:h-[80vh] md:h-[60vh] lg:h-[90vh] grow-0 shrink-0 basis-full min-w-0"
                key={image.id}
              >
                <Image
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  src={image.url || ""}
                  alt={image.altText || "Product Main Image"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div
        className="w-full embla__viewport overflow-hidden mt-4"
        ref={thumbRef}
      >
        <div className="embla__container flex space-x-2 touch-pan-y touch-pinch-zoom">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                className={`embla__slide relative h-[15dvh] sm:h-[25dvh] md:h-[17dvh] lg:h-[20dvh] grow-0 shrink-0 basis-[25%] md:basis-[33.33%] lg:basis-[20%] min-w-0 ${selectedImageIndex === index ? "border-4" : "border"} border-slate-400 cursor-pointer`}
                key={image.id}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  fill
                  className="object-cover object-center"
                  src={image.url || ""}
                  alt={image.altText || "Product Thumbnail"}
                  sizes="(max-width: 768px) 100vw, 100px"
                  placeholder="blur"
                  blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
