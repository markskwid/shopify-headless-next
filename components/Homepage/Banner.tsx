import Image from "next/image";
import Link from "next/link";
import { clientConfig } from "@/config/client.config";

export default function Banner() {
  return (
    <section
      aria-label="Homepage banner"
      className="rounded-md relative mb-10 w-full h-120 overflow-hidden"
    >
      <div className="w-full relative overflow-hidden h-full">
        <Image
          quality={100}
          loading="eager"
          preload={true}
          className="object-cover"
          alt="Banner image"
          fill
          src={clientConfig.homepage.bannerImageUrl}
          blurDataURL={clientConfig.homepage.bannerBlurDataUrl}
        />
      </div>

      <div className="z-50 absolute max-w-100 left-10 top-1/2 -translate-y-1/2">
        <h1 className="font-bold text-5xl mb-2 leading-12">
          Launch your store in minutes.
        </h1>
        <p className="text-xl text-neutral-700!">
          Stripe-native. Built for the agentic future.
        </p>

        <Link
          className="mt-4 block text-center w-max rounded-full bg-black text-white! py-2 px-5"
          href={"#"}
        >
          Try it today
        </Link>
      </div>
    </section>
  );
}
