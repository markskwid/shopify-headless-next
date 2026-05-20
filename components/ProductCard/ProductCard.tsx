import { PRODUCT_LISTING_TYPE } from "@/types/product";
import { formatPrice } from "@/utils/formatPricing";
import { ImageAndSwatches } from "./ImageAndSwatches";

export const ProductCard = ({ product }: { product: PRODUCT_LISTING_TYPE }) => {
  return (
    <div
      key={product.id}
      className="group w-full grow-0 shrink md:w-[48%] lg:w-[24%] z-10"
    >
      <ImageAndSwatches product={product} />
      <h3 className="text-center font-semibold mt-2 text-xl">
        {product.title}
      </h3>

      <span className="text-center w-full inline-block my-1 font-semibold text-lg">
        {formatPrice(
          product.priceRange.minVariantPrice.amount,
          product.priceRange.minVariantPrice.currencyCode,
        )}{" "}
        &ndash;{" "}
        {formatPrice(
          product.priceRange.maxVariantPrice.amount,
          product.priceRange.maxVariantPrice.currencyCode,
        )}
      </span>
    </div>
  );
};
