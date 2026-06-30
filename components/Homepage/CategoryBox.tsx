import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  handle: string;
  altText: string;
  imgUrl: string;
  description: string;
}

export default function CategoryBox({
  title,
  handle,
  imgUrl,
  altText,
  description,
}: Props) {
  return (
    <Link
      key={title}
      href={`/collection/${handle}`}
      className="group category w-full lg:w-1/2"
    >
      <article>
        <figure className="relative min-h-52 lg:min-h-180 w-full overflow-hidden rounded-md">
          <Image
            fill
            quality={100}
            className="object-cover object-center scale-110 transition-transform duration-200 ease-out group-hover:scale-100"
            src={imgUrl ?? ""}
            alt={altText ?? title}
            sizes="(max-width: 768px) 100vw, 400px"
            placeholder="blur"
            blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
          />
        </figure>
        <h3 className="mt-5 font-bold text-xl text-neutral-600!">{title}</h3>
        <p className="text-neutral-500! text-sm">{description}</p>
      </article>
    </Link>
  );
}
