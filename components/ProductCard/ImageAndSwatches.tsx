"use client";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UiContext";
import { PRODUCT_LISTING_TYPE } from "@/types/productsTypes";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";

type SELECTED_VARIANT_TYPE = {
  variant: string;
  image: string;
};

export const ImageAndSwatches = ({
  product,
}: {
  product: PRODUCT_LISTING_TYPE;
}) => {
  const { addItem, isProductAdding } = useCart();
  const firstVariant = product.variants.nodes[0];
  const [selectedVariant, setSelectedVariant] = useState<SELECTED_VARIANT_TYPE>(
    {
      variant: "",
      image: firstVariant.image?.url ?? product.featuredImage?.url ?? "",
    },
  );

  const setVariantSelected = (variant: string, img: string) => {
    setSelectedVariant({
      variant,
      image: img,
    });
  };

  return (
    <>
      <Link href={product.handle}>
        <figure className="min-h-42 h-100 p-4 bg-gray-400/20 rounded-sm relative overflow-hidden">
          <img
            className="h-full w-full object-cover object-center"
            src={
              selectedVariant.image
                ? selectedVariant.image
                : product.featuredImage?.url
            }
            alt={product.title}
            width={200}
            height={200}
          />

          <figcaption
            className={`h-full rounded-b-md absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out translate-y-0 group-hover:translate-y-0 group-hover:z-20`}
          >
            <button
              data-add-to-wishlist
              className="absolute right-2 top-3 bg-neutral-500 p-2 rounded-full flex items-center overflow-hidden"
            >
              <i>
                <AiOutlineHeart color="white" className="align-middle" />
              </i>
            </button>
            <div className="p-3 bg-neutral-500/10 absolute bottom-0 left-0 right-0 translate-y-full transition-transform ease-out duration-200 group-hover:translate-y-0">
              <button
                className="cursor-pointer p-2 font-semibold text-center text-white rounded-full bg-black w-full"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(
                    selectedVariant.variant
                      ? selectedVariant.variant
                      : firstVariant.id,
                  );
                }}
              >
                {isProductAdding ? (
                  <AiOutlineLoading
                    className="animate-spin text-center inline-block"
                    size={30}
                  />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </figcaption>
        </figure>
      </Link>
      <div className="swatch-wrapper flex justify-center items-center gap-3 mt-2">
        {product.variants.nodes.length > 1 &&
          product.variants.nodes.map((variant) => (
            <button
              onClick={() =>
                variant.image?.url
                  ? setVariantSelected(variant.id, variant.image.url)
                  : undefined
              }
              key={variant.id}
              className={`border border-gray-300 rounded-full h-10 w-10 p-2 text-center font-bold ${variant.id === selectedVariant.variant ? "bg-gray-300" : ""} hover:bg-gray-300`}
            >
              {variant.title.substring(0, 1)}
            </button>
          ))}
      </div>
    </>
  );
};
