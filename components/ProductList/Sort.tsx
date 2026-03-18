"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export const Sort = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const getValueFromParams = () => {
    return params.get("orderBy") && params.get("order")
      ? `${params.get("orderBy")}-${params.get("order")}`
      : "";
  };

  const [localValue, setLocalValue] = useState(getValueFromParams());

  useEffect(() => {
    setLocalValue(getValueFromParams());
  }, [params]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalValue(value);

    const newParams = new URLSearchParams(params.toString());

    if (!value) {
      newParams.delete("orderBy");
      newParams.delete("order");
    } else {
      const [field, order] = value.split("-");
      newParams.set("orderBy", field);
      newParams.set("order", order);
    }

    startTransition(() => {
      router.replace(`/?${newParams.toString()}`, { scroll: false });
    });
  };

  return (
    <select
      value={localValue}
      name="sort-products"
      id="sort-products"
      disabled={isPending}
      className={`border rounded-md px-4 py-2 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      onChange={handleSort}
    >
      <option value="">Sort Products</option>
      <option value="name-asc">Name Ascending</option>
      <option value="name-desc">Name Descending</option>
      <option value="price-asc">Price Ascending</option>
      <option value="price-desc">Price Descending</option>
    </select>
  );
};
