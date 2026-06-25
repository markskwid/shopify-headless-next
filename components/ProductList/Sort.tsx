"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";

export const Sort = memo(() => {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const q = searchParams.get("q");

  const localValue = `${orderBy}-${order}`;
  const [isOpen, setIsOpen] = useState(false);

  const buildSortURL = (orderBy: string, order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", orderBy);
    params.set("order", order);
    return `?${params.toString()}`;
  };

  const normalizeLocalValue = (orderBy: string, order: string): string => {
    if (orderBy === "price" && order === "asc") return "Price low to high";
    if (orderBy === "price" && order === "desc") return "Price high to low";
    if (orderBy === "name" && order === "asc") return "Name from A to Z";
    if (orderBy === "name" && order === "desc") return "Name from Z to A";
    if (orderBy === "relevance" && order === "desc") return "Most Relevant";
    return "Sort Products";
  };

  return (
    <div className="relative [&_label]:text-sm [&_label]:text-neutral-500 [&_a]:text-sm [&_a]:text-neutral-800! [&_a]:flex [&_a]:justify-between [&_a]:items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-sort={localValue}
        className="relative px-4 py-2 min-w-52 rounded-sm border border-gray-400 text-left flex justify-between items-center"
      >
        <label>{normalizeLocalValue(orderBy, order)}</label>
        <FaChevronDown className="text-neutral-500 text-xs inline ml-auto" />
      </button>

      <div
        className={`${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-normal duration-200 ease-out bg-white z-50 px-4 absolute border border-gray-400 mt-2 rounded-sm left-0 right-0`}
      >
        <Link
          href={buildSortURL("price", "asc")}
          className="block my-2"
          replace
        >
          Price from low to high
          {localValue === "price-asc" && <AiOutlineCheck />}
        </Link>
        <Link
          href={buildSortURL("price", "desc")}
          className="block my-2"
          replace
        >
          Price from high to low
          {localValue === "price-desc" && <AiOutlineCheck />}
        </Link>
        {!q ? (
          <>
            <Link
              href={buildSortURL("name", "asc")}
              className="block my-2"
              replace
            >
              Name from A to Z{localValue === "name-asc" && <AiOutlineCheck />}
            </Link>
            <Link
              href={buildSortURL("name", "desc")}
              className="block my-2"
              replace
            >
              Name from Z to A{localValue === "name-desc" && <AiOutlineCheck />}
            </Link>
          </>
        ) : (
          <>
            <Link
              href={buildSortURL("relevance", "desc")}
              className="block my-2"
              replace
            >
              Most Relevant{localValue === "name-desc" && <AiOutlineCheck />}
            </Link>
          </>
        )}
      </div>
    </div>
  );
});
