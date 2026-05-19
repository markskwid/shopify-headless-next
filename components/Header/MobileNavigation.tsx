"use client";
import { MENU_TYPE } from "@/types/menu";
import Link from "next/link";
import { useState } from "react";
import { AiFillCaretDown, AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
export const MobileNavigation = ({ menu }: { menu: MENU_TYPE[] }) => {
  const [openNavId, setOpenNavId] = useState<string | null>();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenNavId((prev) => (prev === id ? null : id));
  };

  const toggleNavigation = () => setOpenNavigation(!openNavigation);

  return (
    <>
      <button onClick={toggleNavigation} className="inline-block md:hidden">
        <i>
          <AiOutlineMenu />
        </i>
      </button>
      <div
        className={`md:hidden min-h-screen z-10 w-screen fixed top-0 left-0 right-0 bg-black/20 delay-150 duration-700 transition-normal ${openNavigation ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-white absolute bottom-0 ${openNavigation ? "translate-x-0" : "-translate-x-full"} pb-10 h-full w-75 max-w-125 px-5 rounded-r-3xl transition-normal delay-150 duration-300 ease-in-out`}
        >
          <button
            onClick={toggleNavigation}
            className="mt-5 text-sm uppercase text-red-400 flex justify-start items-center gap-1"
          >
            <i>
              <AiOutlineArrowLeft />
            </i>
            Close Menu
          </button>
          <nav>
            {menu && (
              <ul className="[&>li]:text-start [&>li]:my-2 [&>li>a]:font-bold [&>li>button]:font-bold [&>li>button]:text-lg [&>li>a]:text-lg mt-7">
                {menu.map((item: MENU_TYPE) => (
                  <li key={item.id}>
                    {item.items.length > 0 ? (
                      <button
                        aria-label={item.label}
                        className="relative"
                        onClick={() => toggleMenu(item.id)}
                      >
                        {item.title}
                        <i
                          className={`inline-block ml-2 align-middle transform transition-transform duration-75 ease-in ${openNavId === item.id ? "rotate-180" : "rotate-0"}`}
                        >
                          <AiFillCaretDown size={15} />
                        </i>
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        aria-label={item.label}
                        className="relative"
                      >
                        {item.title}
                      </Link>
                    )}

                    {item.items.length > 0 && (
                      <>
                        <div
                          className={`sub-nav overflow-hidden transition-normal duration-300 ease-in ${openNavId === item.id ? "max-h-32" : "max-h-0"}`}
                          id={item.id}
                        >
                          <ul className="px-5 [&>li]:text-start [&>li]:my-2 [&>li>a]:font-bold [&>li>a]:text-lg">
                            {item.items.map((sub: MENU_TYPE) => (
                              <li key={sub.id}>
                                <Link
                                  href={sub.url}
                                  aria-label={sub.label}
                                  className="relative"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
