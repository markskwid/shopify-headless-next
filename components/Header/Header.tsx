import { getMenuByHandle } from "@/lib/shopify/api/menus";
import { MENU_TYPE } from "@/types/menuTypes";
import { API_RESPONSE } from "@/types/responseTypes";
import { DesktopHeader } from "./DesktopHeader";
import { getCartAction } from "@/app/(cart)/getCart/action";
import { CART_TYPE } from "@/types/cartTypes";

//styling
import "./style.css";

export const Header = async () => {
  const menuResult: API_RESPONSE<MENU_TYPE[]> =
    await getMenuByHandle("main-menu");

  if (!menuResult.success) return;

  const menus: MENU_TYPE[] = menuResult.data ?? [];

  return (
    <>
      <DesktopHeader menu={menus} />
    </>
  );
};
