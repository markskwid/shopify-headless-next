"use client";

import { useCart } from "@/context/Cart";
import { PRODUCT_DETAIL_TYPE, PRODUCT_VARIANT_TYPE } from "@/types/product";
import { formatPrice } from "@/utils/formatPricing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  productData: PRODUCT_DETAIL_TYPE;
  selectedVariant: PRODUCT_VARIANT_TYPE;
}

export default function ProductInformation({
  productData,
  selectedVariant,
}: Props) {
  const router = useRouter();
  const { addItem, addingVariant } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleVariantChange = (variantId: string) => {
    // Logic to update the selected variant based on user selection
    router.replace(`?size=${variantId}`);
  };

  const handleAddToCart = (
    variantId: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    // Logic to add the selected variant to the cart
    e.preventDefault();
    addItem(variantId, quantity);
  };

  const handleQuantityChange = (action: "inc" | "dec") => {
    if (action === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const isAddingThisVariant = addingVariant === selectedVariant.id;

  console.log("Selected Variant:", selectedVariant);
  return (
    <div>
      <h1 className="font-bold text-6xl">{productData?.title}</h1>
      <p className="font-bold text-4xl mt-2">
        {formatPrice(
          selectedVariant?.price?.amount ?? "0",
          selectedVariant?.price?.currencyCode ?? "USD",
        )}
      </p>

      {productData?.description && (
        <div className="mt-4">
          <p>{productData.description}</p>
        </div>
      )}

      {productData?.variants.nodes.length && (
        <>
          <span className="block mt-5 mb-2 font-bold">Sizes:</span>
          <div className="flex items-center gap-4 mt-4">
            {productData.variants.nodes.map((variant) => (
              <button
                onClick={() => handleVariantChange(variant.title)}
                key={variant.id}
                className={`cursor-pointer border rounded-full h-12 w-12 p-2 text-center font-bold hover:bg-gray-300 ${selectedVariant.id === variant.id ? "bg-gray-300 border-black border-2" : " border-gray-300 "}`}
              >
                {variant.title.substring(0, 1)}
              </button>
            ))}
          </div>
        </>
      )}

      <div>
        <span className="block mt-5 mb-2 font-bold">Quantity:</span>
        <form
          className="flex items-center mt-5 space-x-5"
          onSubmit={(e) => handleAddToCart(selectedVariant.id, e)}
        >
          <div className="basis-[50%] flex border border-black/20 max-w-52 justify-between items-center h-13 rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => handleQuantityChange("dec")}
              className="grow basis-[25%] h-full text-center bg-black/20 cursor-pointer flex justify-center items-center"
            >
              <AiOutlineMinus />
            </button>
            <input
              className="text-center shrink min-w-0 h-full appearance-none! font-bold text-lg"
              type="number"
              defaultValue={quantity}
              min="1"
              max="10"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange("inc")}
              className="grow basis-[25%] h-full text-center bg-black/20 cursor-pointer flex justify-center items-center"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            type="submit"
            className="w-full border bg-black hover:bg-black/80 py-3 rounded-full text-white text-lg font-bold cursor-pointer"
            disabled={isAddingThisVariant}
          >
            {isAddingThisVariant ? "Adding..." : "Add to Cart"}
          </button>
        </form>
      </div>

      {selectedVariant.availableForSale && (
        <span className="text-red-500 mt-4 block font-bold">
          This variant is currently out of stock.
        </span>
      )}
    </div>
  );
}
