"use client";

import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useCart } from "@/context/Cart";
import { useUI } from "@/context/UserInterface";
import { useEffect, useState } from "react";
import { searchResults } from "@/lib/shopify/api/search";
import { PRODUCT_SEARCH_TYPE } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

export const NavUser = () => {
  const { cart } = useCart();
  const { toggleCart, toggleMobileNavigation } = useUI();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<PRODUCT_SEARCH_TYPE[] | null>(
    null,
  );

  useEffect(() => {
    if (!searchQuery) {
      setSearchData(null);
      return;
    }

    const getSearchData = async () => {
      const res = await searchResults(searchQuery);
      if (!res.success && !res.data) return;

      setSearchData(res.data);
    };

    const timeout = setTimeout(() => {
      getSearchData();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  return (
    <div className="flex justify-end items-center gap-3 [&_i]:text-2xl">
      <div className="input-container absolute left-1/2 right-0 -translate-x-1/2 opacity-0 translate-y-full -bottom-10 w-[90%] md:relative md:translate-0 md:left-0 md:bottom-0 md:translate-y-0 md:opacity-100">
        <form method="POST" className="">
          <input
            onChange={handleInputChange}
            type="text"
            tabIndex={1}
            className="border bg-gray-300/50 rounded-md py-1 px-2 shadow-2xl w-full md:w-72"
            placeholder="Search item"
          />

          <button type="submit" className="absolute right-2 top-1 align-middle">
            <i>
              <AiOutlineSearch />
            </i>
          </button>
        </form>

        {searchData && (
          <div className="absolute bg-white w-full border border-gray-400 mt-2 rounded-md px-2 left-0 right-0">
            {searchData.map((item: PRODUCT_SEARCH_TYPE) => (
              <Link
                key={item.id}
                href={item.handle}
                className="flex justify-start items-center my-2"
              >
                <div className="relative mr-2">
                  <Image
                    src={item.featuredImage?.url ?? ""}
                    width="50"
                    alt={item.title}
                    height="50"
                    loading={"lazy"}
                  />
                </div>
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <button className="md:hidden align-middle">
        <i>
          <AiOutlineSearch />
        </i>
      </button>
      <button>
        <i>
          <AiOutlineUser />
        </i>
      </button>
      <button className="relative cursor-pointer" onClick={toggleCart}>
        <i>
          <AiOutlineShoppingCart />
        </i>

        {(cart?.totalQuantity ?? 0) > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white! rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart?.totalQuantity}
          </span>
        )}
      </button>

      <button
        onClick={() => toggleMobileNavigation()}
        className="inline-block lg:hidden test"
      >
        <i>
          <AiOutlineMenu />
        </i>
      </button>
    </div>
  );
};
