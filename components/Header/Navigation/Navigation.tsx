import { MENU_TYPE } from "@/types/menu";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { NavigationData } from "@/types/navigation";
export const Navigation = ({ menu }: { menu: NavigationData["header"] }) => {
  return (
    <>
      <DesktopNavigation menu={menu} />
      {/* <MobileNavigation menu={menu} /> */}
    </>
  );
};
