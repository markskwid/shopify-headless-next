import { PageWrapper } from "@/components/PageWrapper";
import ProductImages from "@/components/ProductPage/ProductImages";
import ProductInformation from "@/components/ProductPage/ProductInformation";
import { getProductByHandle } from "@/lib/shopify/api/products";

interface Props {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ size?: string }>;
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { size } = await searchParams;
  const productResponse = await getProductByHandle(handle);

  if (!productResponse.errors && !productResponse.data) {
    console.log("No product found");
  }

  const productData = productResponse.data;
  const selectedVariant = productData?.variants.nodes.find((v) => v.title === size) ?? productData?.variants.nodes[0]!;

  const selectedImageIndex = productData?.images.edges.findIndex(({ node }) => node.id === selectedVariant.image?.id);
  
  return (
    <PageWrapper>
      <section className="flex flex-col md:flex-row justify-start items-start space-x-12">
        {productData && (
          <>
            <ProductImages
              images={productData?.images.edges.map(({ node }) => node) ?? []}
              selectedImageIndex={selectedImageIndex}
            />
            <ProductInformation productData={productData} selectedVariant={selectedVariant} />
          </>
        )}
      </section>
    </PageWrapper>
  );
}
