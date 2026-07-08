import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "@/components/ProductList/ProductList";
import ProductImages from "@/components/ProductPage/ProductImages";
import ProductInformation from "@/components/ProductPage/ProductInformation";
import { ProductListSkeleton } from "@/components/Skeleton/ProductList";
import {
  getProductByHandle,
  getProductRecommendation,
} from "@/lib/shopify/api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ size?: string }>;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product.data) {
    return {};
  }

  const data = product.data;

  const title = data.seo?.title || `${data.title} | Your Store`;

  const description =
    data.seo?.description || data.description?.slice(0, 160) || "";

  const image = data.images.edges[0]?.node.url;

  return {
    title,
    description,

    alternates: {
      canonical: `/products/${handle}`,
    },

    openGraph: {
      title,
      description,
      images: image ? [image] : [],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { size } = await searchParams;

  const [productResponse, productRecommendation] = await Promise.all([
    getProductByHandle(handle),
    getProductRecommendation(handle),
  ]);

  if (productResponse.errors || !productResponse.data) {
    console.error("Error", productResponse.errors);
    return notFound();
  }

  const productData = productResponse.data;
  const selectedVariant =
    productData?.variants.nodes.find((v) => v.title === size) ??
    productData?.variants.nodes[0]!;

  const selectedImageIndex = productData?.images.edges.findIndex(
    ({ node }) => node.id === selectedVariant.image?.id,
  );

  return (
    <PageWrapper>
      <>
        <section className="flex flex-col md:flex-row justify-start items-start space-x-12">
          {productData && (
            <>
              <ProductImages
                images={productData?.images.edges.map(({ node }) => node) ?? []}
                selectedImageIndex={selectedImageIndex}
              />
              <ProductInformation
                productData={productData}
                selectedVariant={selectedVariant}
              />
            </>
          )}
        </section>
        {productRecommendation.data && (
          <>
            <h2 className="text-4xl font-bold mb-10 mt-20">Related Products</h2>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList
                products={productRecommendation?.data ?? []}
                isSlider={true}
                isCollection={false}
              />
            </Suspense>
          </>
        )}
      </>
    </PageWrapper>
  );
}
