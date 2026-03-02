import { PageWrapper } from "@/components/PageWrapper";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/lib/shopify/api/products";
import { PRODUCT_LISTING_TYPE } from "@/types/productsTypes";
import { API_RESPONSE } from "@/types/responseTypes";
import { formatPrice } from "@/utils/formatPricing";
import { unstable_cache } from "next/cache";
import { AiOutlineHeart } from "react-icons/ai";

const cache_products_listing: () => Promise<
  API_RESPONSE<PRODUCT_LISTING_TYPE[]>
> = unstable_cache(
  async () => {
    return getProducts();
  },
  ["homepage-products"],
  {
    tags: ["products"],
    revalidate: 300,
  },
);

export default async function Home() {
  const productListResponse = await cache_products_listing();

  if (!productListResponse.success) {
    return <p>Failed to fetch products...</p>;
  }

  const products = productListResponse.data ?? [];

  // console.log(products);
  return (
    <PageWrapper>
      <div className="flex flex-wrap justify-start items-start space-x-2 space-y-5">
        {products.map((product: PRODUCT_LISTING_TYPE) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageWrapper>
  );
}
