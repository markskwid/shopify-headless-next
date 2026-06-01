"use client";
import { removeDiscountCodeAction } from "@/app/(cart)/removeDiscountCode/action";
import { AiOutlineClose } from "react-icons/ai";

export default function DiscountCode({ code }: { code: string }) {
  const handleRemoveDiscount = async () => {
    const result = await removeDiscountCodeAction();

    if (!result.success) {
      console.log("Failed to remove discount code");
    }
  };
  return (
    <span
      onClick={handleRemoveDiscount}
      role="button"
      className="max-w-max cursor-pointer flex justify-self-end justify-center items-center gap-1 bg-neutral-500 text-white! py-1 px-2"
    >
      <AiOutlineClose size={10} />
      {code}
    </span>
  );
}
