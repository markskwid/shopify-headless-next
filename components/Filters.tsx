"use client";

import { FILTER_TYPE } from "@/types/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: FILTER_TYPE[];
  searchParams: {
    available?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function Filters({ filters, searchParams }: Props) {
  const currentParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (input: string, checked: boolean) => {
    const parsed = JSON.parse(input);
    const params = new URLSearchParams(currentParams.toString());

    if ("available" in parsed) {
      if (checked) {
        params.set("available", String(parsed.available));
      } else {
        params.delete("available");
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (key: "minPrice" | "maxPrice", value: string) => {
    const params = new URLSearchParams(currentParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside>
      {filters.map((filter) => (
        <div key={filter.id}>
          <h3 className="text-xl font-bold mb-2 mt-1">{filter.label}</h3>

          {(filter.type === "LIST" || filter.type === "BOOLEAN") &&
            filter.values.map((value) => {
              const parsed = JSON.parse(value.input);
              const isChecked =
                "available" in parsed
                  ? searchParams.available === String(parsed.available)
                  : false;

              return (
                <label key={value.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={isChecked}
                    onChange={(e) =>
                      handleFilterChange(value.input, e.target.checked)
                    }
                  />
                  {value.label} ({value.count})
                </label>
              );
            })}

          {filter.type === "PRICE_RANGE" && (
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                defaultValue={searchParams.minPrice}
                onBlur={(e) => handlePriceChange("minPrice", e.target.value)}
                className="border p-1 w-[40%]"
              />
              <input
                type="number"
                placeholder="Max"
                defaultValue={searchParams.maxPrice}
                onBlur={(e) => handlePriceChange("maxPrice", e.target.value)}
                className="border p-1 w-[40%]"
              />
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
