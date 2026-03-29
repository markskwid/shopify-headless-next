"use client";

import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useCart } from "@/context/Cart";
import { useUI } from "@/context/UserInterface";
import { SearchBar } from "./Search";
import useMediaQuery from "@/lib/responsiveness/useMediaQuery";

export const NavUser = () => {
  const { cart } = useCart();
  const {
    toggleCart,
    toggleMobileNavigation,
    isSearchBarOpen,
    toggleSearchBar,
  } = useUI();

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex justify-end items-center gap-3 [&_i]:text-2xl">
      <div
        className={`transition-none ${isMobile ? isSearchBarOpen ? "max-md:pointer-events-auto max-md:opacity-100 max-md:translate-y-0 max-md:duration-75 max-md:delay-0" : "max-md:opacity-0 max-md:-translate-y-full max-md:duration-100 max-md:delay-75 max-md:pointer-events-none" : ""} 
          max-md:transition-[scale, transform] max-md:absolute max-md:-bottom-10 max-md:w-[92%] max-md:left-1/2 max-md:-translate-x-1/2`}
      >
        <SearchBar />
      </div>
      <button onClick={toggleSearchBar} className="md:hidden align-middle">
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
