import { getMenuByHandle } from "@/lib/shopify/api/menu";
import { MENU_TYPE } from "@/types/menu";
import { API_RESPONSE } from "@/types/response";
import { NavUser } from "./NavUser";
import Link from "next/link";
//styling
import "./style.css";
import { Navigation } from "./Navigation/Navigation";
import StoreLogo from "./StoreLogo";

export const Header = async () => {
  const menuResult: API_RESPONSE<MENU_TYPE[]> =
    await getMenuByHandle("main-menu");

  if (!menuResult.success) return;

  const menu: MENU_TYPE[] = menuResult.data ?? [];

  return (
    <header className="sticky top-0 text-black backdrop-blur-md z-100">
      <div className="px-5 py-5 flex justify-between items-center max-w-360 mx-auto ">
        <Link href="/">
          <StoreLogo />
        </Link>

        <Navigation menu={menu} />
        <NavUser />
      </div>
    </header>
  );
};
