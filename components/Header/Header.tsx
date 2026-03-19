import { getMenuByHandle } from "@/lib/shopify/api/menu";
import { MENU_TYPE } from "@/types/menu";
import { API_RESPONSE } from "@/types/response";

import Link from "next/link";
import { NavUser } from "./NavUser";
//styling
import "./style.css";
import { Navigation } from "./Navigation/Navigation";

export const Header = async () => {
  const menuResult: API_RESPONSE<MENU_TYPE[]> =
    await getMenuByHandle("main-menu");

  if (!menuResult.success) return;

  const menu: MENU_TYPE[] = menuResult.data ?? [];

  return (
    <header className="sticky top-0 text-black backdrop-blur-md z-100 will-change-transform">
      <div className="px-5 py-5 flex justify-between items-center max-w-360 mx-auto ">
        <div>
          <h1 className="font-bold text-2xl text-black">Mark Store</h1>
        </div>

        <Navigation menu={menu} />
        <NavUser />
      </div>
    </header>
  );
};
