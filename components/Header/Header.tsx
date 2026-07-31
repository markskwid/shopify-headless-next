import { NavUser } from "./NavUser";
import Link from "next/link";
//styling
import "./style.css";
import StoreLogo from "./StoreLogo";
import { Navigation } from "./Navigation/Navigation";
import { getHeaderMenu } from "@/sanity/api/navigation";

export const Header = async () => {
  const menu = await getHeaderMenu();

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
