"use client";

import { PRODUCT_LISTING_TYPE } from "@/types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductSlider } from "./ProductSlider";

export const ProductList = ({
  products,
  isSlider = false,
}: {
  products: PRODUCT_LISTING_TYPE[];
  isSlider: boolean;
}) => {
  if (isSlider) {
    return <ProductSlider products={products} />;
  }

  return (
    <section aria-label="Product Listing" className="min-h-screen">
      <div className="flex flex-wrap justify-start items-start space-x-2 space-y-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
