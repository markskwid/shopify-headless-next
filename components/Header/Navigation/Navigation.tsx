import { MENU_TYPE } from "@/types/menu";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";

export const Navigation = ({ menu }: { menu: MENU_TYPE }) => {
  return (
    <>
      <DesktopNavigation menu={menu} />
      <MobileNavigation menu={menu} />
    </>
  );
};
