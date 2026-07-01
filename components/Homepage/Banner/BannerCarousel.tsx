"use client";

import { clientConfig } from "@/config/client.config";
import { BANNER_TYPE } from "@/types/metaobjects";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BannerCarousel({ slides }: { slides: BANNER_TYPE[] }) {
  const [mainImageRef, mainImageApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  // sync Embla's selected index into React state
  useEffect(() => {
    if (!mainImageApi) return;
    mainImageApi.on("select", () => {
      setCurrent(mainImageApi.selectedScrollSnap());
    });
  }, [mainImageApi]);

  return (
    <section
      aria-label="Homepage banner"
      className="embla rounded-md relative mb-10 w-full h-120 overflow-hidden"
    >
      <div
        className="embla__viewport w-full h-full overflow-hidden"
        ref={mainImageRef}
      >
        <div className="embla__container flex touch-pan-y touch-pinch-zoom h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide shrink-0 min-w-0 w-full relative h-full"
            >
              {slide.image && (
                <Image
                  src={slide.image.url}
                  alt={slide.image.altText ?? slide.title ?? "Banner"}
                  fill
                  quality={85}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL={clientConfig.homepage.bannerBlurDataUrl}
                  className="object-cover"
                />
              )}

              <div className="z-10 absolute max-w-100 left-10 top-1/2 -translate-y-1/2">
                <h1 className="font-bold text-5xl mb-2 leading-12">
                  {slide.title}
                </h1>
                <p className="text-xl text-neutral-700">{slide.description}</p>
                <Link
                  className="mt-4 block text-center w-max rounded-full bg-black text-white! py-2 px-5"
                  href={slide.buttonUrl ?? "/collections/all"}
                >
                  {slide.buttonTitle}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators — only when more than one slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => mainImageApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
