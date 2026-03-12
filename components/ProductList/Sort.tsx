"use client";
import { useSearchParams, useRouter } from "next/navigation";

export const Sort = () => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const optionEl = e.target.value;
    const newParams = new URLSearchParams(params.toString());

    if (!optionEl) {
      newParams.delete("orderBy");
      newParams.delete("order");
    } else {
      const [field, value] = e.target.value.split("-");
      newParams.set("orderBy", field);
      newParams.set("order", value);
    }

    router.replace(`/?${newParams.toString()}`);
  };
  return (
    <select
      name="sort-products"
      id="sort-products"
      className="border rounded-md px-4 py-2"
      onChange={handleSort}
      defaultValue={params.get("order") ?? ""}
    >
      <option value="">Sort Products</option>
      <option value="name-asc">Name Ascending</option>
      <option value="name-desc">Name Descending</option>
    </select>
  );
};
