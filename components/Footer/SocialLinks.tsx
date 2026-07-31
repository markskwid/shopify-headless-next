import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { ReactNode } from "react";
import { SOCIAL_LINKS_TYPE } from "@/types/social";

export default function SocialLinks({
  socialMedias,
}: {
  socialMedias: SOCIAL_LINKS_TYPE[];
}) {
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
      case "tiktok":
        return <FaTiktok />;
      case "linked-in":
        return <FaLinkedinIn />;
      default:
        return null;
    }
  };
  return (
    <div className="social-icons flex justify-start items-center space-x-1.5">
      {socialMedias?.map((item) => (
        <a
          href={item.url}
          aria-label={item.platform}
          className="border-gray-500 border p-2 rounded-full transition-colors duration-100 bg-gray-200 hover:bg-gray-300"
          key={item._key}
        >
          {socialIcon(item.platform)}
        </a>
      ))}
    </div>
  );
}
