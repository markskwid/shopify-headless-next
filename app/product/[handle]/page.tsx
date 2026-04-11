import { PageWrapper } from "@/components/PageWrapper";
import { getProductByHandle } from "@/lib/shopify/api/products";
import { formatPrice } from "@/utils/formatPricing";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const productResponse = await getProductByHandle(handle);

  if (!productResponse.errors && !productResponse.data) {
    console.log("No product found");
  }

  const productData = productResponse.data;
  const selectedVariant = productData?.variants.nodes[0];
  return (
    <PageWrapper>
      <section className="flex justify-start items-start space-x-12">
        <div className="relative min-h-152 w-1/2">
          <Image
            fill
            className="object-cover object-center"
            src={productData?.featuredImage?.url || ""}
            alt={productData?.title || "Product Main Image"}
            sizes="(max-width: 768px) 100vw, 400px"
            placeholder="blur"
            blurDataURL="https://cdn.shopify.com/s/files/1/0805/0642/1503/files/blur.avif?v=1773318451"
          />
        </div>
        <div>
          <h1 className="font-bold text-4xl">{productData?.title}</h1>
          <p>{selectedVariant?.price?.amount}</p>
        </div>
      </section>
    </PageWrapper>
  );
}
