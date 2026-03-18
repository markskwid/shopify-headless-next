import { PRODUCT_LISTING_TYPE } from "@/types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { Sort } from "./Sort";
export const ProductList = ({
  products,
}: {
  products: PRODUCT_LISTING_TYPE[];
}) => {
  return (
    <section aria-label="Product Listing" className="min-h-screen">
      <div className="w-full mb-5 flex justify-end items-center px-2">
        <Sort />
      </div>
      <div className="flex flex-wrap justify-start items-start space-x-2 space-y-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
