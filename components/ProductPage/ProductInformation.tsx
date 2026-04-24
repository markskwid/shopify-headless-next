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
  const [error, setError] = useState<string | null>(null);

  const handleVariantChange = (variantId: string) => {
    // Logic to update the selected variant based on user selection
    router.replace(`?size=${variantId}`);
  };

  const handleAddToCart = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // Logic to add the selected variant to the cart
    e.preventDefault();

    if (!selectedVariant.availableForSale) {
      setError("This variant is currently out of stock.");
      return;
    }

    const success = await addItem(selectedVariant.id, quantity);

    if (!success) {
      setError("Failed to add item to cart. Please try again.");
      return;
    }

    setError(null);
  };

  const handleQuantityChange = (action: "inc" | "dec") => {
    if (action === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const isOutStock = !selectedVariant.availableForSale;
  const isAddingThisVariant = addingVariant === selectedVariant.id;
  const isDisabled = isOutStock || isAddingThisVariant;

  return (
    <div className="mt-5 basis-full md:basis-[50%] md:mt-0 md:sticky md:top-20">
      <h1 className="font-bold text-4xl lg:text-6xl">{productData?.title}</h1>
      <p className="font-bold md:text-3xl lg:text-4xl mt-2">
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

      {productData?.variants.nodes.length > 1 && (
        <>
          <span className="block mt-5 mb-2 font-bold">Select Size:</span>
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
          className="flex items-center flex-row md:flex-col lg:flex-row md:justify-center md:space-y-3 lg:space-y-0 mt-5 space-x-5"
          onSubmit={handleAddToCart}
        >
          <div className="basis-1/2 h-13 md:basis-auto lg:basis-[50%] flex border border-black/20 w-full md:max-w-52 lg:max-w-52 md:max-h-12 lg:h-13 justify-between items-center self-start rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => handleQuantityChange("dec")}
              className="grow basis-[35%] md:basis-[25%] h-full text-center bg-black/20 cursor-pointer flex justify-center items-center"
            >
              <AiOutlineMinus />
            </button>
            <input
              className="basis-[30%] text-center shrink min-w-0 h-full appearance-none! font-bold text-lg"
              type="number"
              value={quantity}
              min="1"
              max="10"
              onChange={(e) => {
                const value = Math.min(10, Math.max(1, Number(e.target.value)));
                setQuantity(value);
              }}
            />
            <button
              type="button"
              onClick={() => handleQuantityChange("inc")}
              className="grow basis-[35%] md:basis-[25%] h-full text-center bg-black/20 cursor-pointer flex justify-center items-center"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            type="submit"
            className={`w-full grow border bg-black hover:bg-black/80 py-3 rounded-full text-white text-lg font-bold  ${isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            disabled={isDisabled}
          >
            {isAddingThisVariant ? "Adding..." : "Add to Cart"}
          </button>
        </form>
      </div>

      {!selectedVariant.availableForSale && (
        <span className="text-red-500! mt-4 block font-bold">
          This variant is currently out of stock.
        </span>
      )}

      {error && (
        <span className="text-red-500! mt-4 block font-bold">
          Failed to add item to cart. Please try again
        </span>
      )}
    </div>
  );
}
