import { getMenuByHandle } from "@/lib/shopify/api/menu";
import { getSocialMedias } from "@/lib/shopify/api/metaobjects";
import { ReactNode } from "react";
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

export const Footer = async () => {
  const [footerMenus, socialMedias] = await Promise.all([
    getMenuByHandle("footer"),
    getSocialMedias(),
  ]);

  console.log(socialMedias, footerMenus)

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
      <div className="max-w-360 mx-auto my-5">
        <div className="">
          <div className="social-icons flex justify-start items-center space-x-1.5">
            {socialMedias.data?.map((item) => (
              <a
                href="#"
                aria-label={item.handle}
                className="border-gray-500 border p-2 rounded-full transition-colors duration-100 bg-gray-200 hover:bg-gray-400"
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
      </div>
      <div className="text-center py-2">
        © 2026 Mark Headless. All rights reseved.
      </div>
    </footer>
  );
};
