import { MENU_TYPE } from "@/types/menuTypes";

import Link from "next/link";
import { NavUser } from "./NavUser";
export const DesktopHeader = ({ menu }: { menu: MENU_TYPE[] }) => {
  return (
    <header className="sticky top-0 backdrop-blur-md  text-black drop-shadow-2xl shadow-white z-100">
      <div className="px-5 py-5 flex justify-between items-center max-w-360 mx-auto">
        <div>
          <h1 className="font-bold text-2xl text-black">Mark Store</h1>
        </div>

        <nav className="hidden lg:block">
          {menu.length > 0 && (
            <ul className="[&>a]:text-black flex items-center gap-5">
              {menu.map((item: MENU_TYPE) => (
                <li
                  key={item.id}
                  className="group py-2 px-3 rounded-md hover:bg-gray-500/20 relative"
                >
                  <Link className="font-bold text-lg" href={item.url}>
                    {item.title}
                  </Link>

                  {item.items.length > 0 && (
                    <ul className="bg-white absolute top-13 left-0 p-5 rounded-md border border-gray-200 transition-opacity opacity-0 group-hover:opacity-100">
                      {item.items.map((sub: MENU_TYPE) => (
                        <li className="py-2" key={sub.id}>
                          {sub.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
        <NavUser menu={menu} />
      </div>
    </header>
  );
};
