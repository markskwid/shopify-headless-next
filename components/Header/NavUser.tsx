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
      <div className="relative">
        <div>
          <input
            onChange={handleInputChange}
            type="text"
            tabIndex={1}
            className="border bg-gray-300/50 rounded-md py-1 px-2 shadow-2xl w-72 hidden md:block"
            placeholder="Search item"
          />

          <button className="md:absolute md:right-2 md:top-1 align-middle">
            <i>
              <AiOutlineSearch />
            </i>
          </button>
        </div>

        {searchData && (
          <div className="absolute bg-white w-full border border-gray-400 mt-2 rounded-md px-2 left-0 right-0">
            {searchData.map((item: PRODUCT_SEARCH_TYPE) => (
              <Link
                href={item.handle}
                className="flex justify-start items-center my-2"
              >
                <img width={50} src={item.featuredImage?.url} className="mr-2" />
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
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
