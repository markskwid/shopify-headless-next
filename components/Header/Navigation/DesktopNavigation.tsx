"use client";

import { MENU_TYPE } from "@/types/menu";
import { InternalLinkItem, SanityMenu } from "@/types/navigation";
import { resolveSanityLink } from "@/utils/resolveSanityLink";
import Link from "next/link";
import { useRef, useState } from "react";

export const DesktopNavigation = ({ menu }: { menu: any }) => {
  const [navigationOpenId, setNavigationOpenId] = useState<string | undefined>(
    undefined,
  );

  let timeoutId = useRef<NodeJS.Timeout | null>(null);

  return (
    <nav className="hidden lg:block" aria-label={menu.title || "Main Menu"}>
      {menu.mainMenu.items.length > 0 && (
        <ul className="[&>a]:text-black flex items-center gap-5">
          {menu.mainMenu.items.map((item: InternalLinkItem) => (
            <li
              key={item._key}
              onMouseEnter={() => {
                if (timeoutId.current) clearTimeout(timeoutId.current);
                setNavigationOpenId(item._key);
              }}
              onMouseLeave={() => {
                timeoutId.current = setTimeout(
                  () => setNavigationOpenId(undefined),
                  200,
                );
              }}
              className="group py-2 px-3 rounded-md hover:bg-gray-500/20 relative"
            >
              <Link className="font-bold text-lg" href={resolveSanityLink(item)}>
                {item.title}
              </Link>

              {/* {item.items.length > 0 && (
                <ul
                  className={`bg-white absolute top-13 left-0 p-5 rounded-md border border-gray-200 transition-opacity ease-out ${item.id === navigationOpenId ? "opacity-100 pointer-events-auto " : "opacity-0  pointer-events-none "}`}
                >
                  {item.items.map((sub: MENU_TYPE) => (
                    <li className="py-2" key={sub.id}>
                      <Link href="#">{sub.title}</Link>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
