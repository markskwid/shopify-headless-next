"use client";

import { applyDiscountAction } from "@/app/(cart)/applyDiscountCode/action";
import { useState } from "react";

export default function ToggleDiscount() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await applyDiscountAction(formData);

    if (!result.success) {
      console.log(result.errors);
      setError("Failed to apply coupon. Try again");
    }

    console.log(result.data);
  };
  return (
    <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
      <strong className="text-lg">Coupon Code: </strong>
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-end underline cursor-pointer"
      >
        Add Code
      </button>

      {showForm && (
        <>
          {error && (
            <p className="col-span-5 mt-2 text-red-500! font-semibold">
              {error}
            </p>
          )}
          <form
            method="POST"
            className="mt-3 col-span-2 flex items-center space-x-5"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Input code"
              id="code"
              name="code"
              className="border border-neutral-400 rounded-md w-full px-3 py-2"
            />
            <button
              className="text-white! font-semibold uppercase py-2 px-5 text-center bg-neutral-500 rounded-full tracking-widest cursor-pointer"
              type="submit"
            >
              Apply
            </button>
          </form>
        </>
      )}
    </div>
  );
}
