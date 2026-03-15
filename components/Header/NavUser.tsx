"use client";

import { MENU_TYPE } from "@/types/menu";
import { MobileNavigation } from "./MobileNavigation";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useCart } from "@/context/Cart";
import { useUI } from "@/context/UserInterface";

export const NavUser = ({ menu }: { menu: MENU_TYPE[] }) => {
  const { cart } = useCart();
  const { toggleCart } = useUI();

  return (
    <div className="flex justify-end items-center gap-3 [&_i]:text-2xl">
      <div className="relative">
        <input
          type="text"
          tabIndex={1}
          className="border-2 bg-gray-300/50 rounded-md py-1 px-2 shadow-2xl w-72 hidden md:block"
          placeholder="Search item"
        />

        <button className="md:absolute md:right-2 md:top-1 align-middle">
          <i>
            <AiOutlineSearch />
          </i>
        </button>
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

      <MobileNavigation menu={menu} />
    </div>
  );
};
