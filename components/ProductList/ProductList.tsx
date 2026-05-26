"use client";

import { PRODUCT_LISTING_TYPE } from "@/types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductSlider } from "./ProductSlider";

export const ProductList = ({
  products,
  isSlider = false,
  isCollection,
}: {
  products: PRODUCT_LISTING_TYPE[];
  isSlider: boolean;
  isCollection: boolean;
}) => {
  if (isSlider) {
    return <ProductSlider products={products} />;
  }
  return (
    <section aria-label="Product Listing" className="min-h-screen">
      <div
        className={
          isCollection
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
