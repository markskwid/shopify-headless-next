import { getMenuByHandle } from "@/lib/shopify/api/menu";
import { getSocialMedias } from "@/lib/shopify/api/metaobjects";
import { ReactNode, Suspense } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  FaCcPaypal,
  FaFacebookF,
  FaGooglePay,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import { NewsletterForm } from "../NewsLetterForm";
import { MENU_TYPE } from "@/types/menu";
import Link from "next/link";
import { Copyright } from "./Copyright";

export const Footer = async () => {
  const [footerMenus, socialMedias] = await Promise.all([
    getMenuByHandle("footer"),
    getSocialMedias(),
  ]);

  const socialIcon = (handle: string): ReactNode | null => {
    switch (handle) {
      case "facebook":
        return <FaFacebookF />;
      case "youtube":
        return <AiOutlineYoutube />;
      case "instagram":
        return <FaInstagram />;
      case "x":
        return <FaXTwitter />;
      case "tik-tok":
        return <FaTiktok />;
      case "linked-in":
        return <FaLinkedinIn />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full p-5 pb-2 border-t-2">
      <div className="max-w-360 mx-auto my-5 pb-8 flex flex-col justify-start items-start lg:flex-row [&>div]:my-5 [&>div]:lg:my-0">
        <div className="w-full flex-[100%] lg:flex-[33.33%]">
          <div className="social-icons flex justify-start items-center space-x-1.5">
            {socialMedias.data?.map((item) => (
              <a
                href="#"
                aria-label={item.handle}
                className="border-gray-500 border p-2 rounded-full transition-colors duration-100 bg-gray-200 hover:bg-gray-300"
                key={item.handle}
              >
                {socialIcon(item.handle)}
              </a>
            ))}
          </div>
          <div className="mt-5">
            <span className="block text-xs text-neutral-500! font-semibold">
              Accepted payment methods:
            </span>
            <div className="flex justify-start items-center space-x-2 mt-2">
              <FaCcPaypal size={40} />
              <FaGooglePay size={40} />
              <RiVisaLine size={40} />
            </div>
          </div>
        </div>

        <div className="w-full flex-[100%] lg:flex-[33.33%]">
          {footerMenus.data && (
            <ul className="flex justify-start items-start spacing-x-5">
              {footerMenus.data.map((item: MENU_TYPE) => (
                <li key={item.id}>
                  <Link href="#" className="font-semibold">
                    {item.title}
                  </Link>
                  {item.items && (
                    <ul>
                      {item.items.map((sub: MENU_TYPE) => (
                        <li key={sub.id}>
                          <Link className="text-sm" href={"#"}>
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full flex-[100%] lg:flex-[33.33%]">
          <NewsletterForm />
        </div>
      </div>

      <Suspense>
        <Copyright />
      </Suspense>
    </footer>
  );
};
