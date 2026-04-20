import { PageWrapper } from "@/components/PageWrapper";
import ProductImages from "@/components/ProductPage/ProductImages";
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

  console.log(productData);
  return (
    <PageWrapper>
      <section className="flex justify-start items-start space-x-12">
        <ProductImages
          images={productData?.images.edges.map(({ node }) => node) ?? []}
        />
        <div>
          <h1 className="font-bold text-6xl">{productData?.title}</h1>
          <p className="font-bold text-4xl mt-2">
            {formatPrice(
              selectedVariant?.price?.amount ?? "0",
              selectedVariant?.price?.currencyCode ?? "USD",
            )}
          </p>

          {productData?.variants.nodes.length && (
            <div className="flex items-center gap-4 mt-4">
              {productData.variants.nodes.map((variant) => (
                <button
                  key={variant.id}
                  className="border border-gray-300 rounded-full h-10 w-10 p-2 text-center font-bold hover:bg-gray-300"
                >
                  {variant.title.substring(0, 1)}
                </button>
              ))}
            </div>
          )}

          {productData?.description && (
            <div className="mt-4">
              <p>{productData.description}</p>
            </div>
          )}

          {}
        </div>
      </section>
    </PageWrapper>
  );
}
