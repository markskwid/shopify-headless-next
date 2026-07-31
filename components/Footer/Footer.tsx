import { FaCcPaypal, FaGooglePay } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { NewsletterForm } from "../NewsLetterForm";
import Link from "next/link";
import { Copyright } from "./Copyright";
import { Suspense } from "react";
import SocialLinks from "./SocialLinks";
import { getFooterSettings } from "@/sanity/api/footer";
import { FOOTER_SETTINGS_TYPE } from "@/types/navigation";

export const Footer = async () => {
  const footerData = await getFooterSettings();

  const socialAccounts = footerData.socialLinks;
  const footerColumns = footerData.columns;

  return (
    <footer className="w-full p-5 pb-2 border-t-2 min-h-52">
      <div className="max-w-360 mx-auto my-5 pb-8 flex flex-col justify-start items-start lg:flex-row [&>div]:my-5 [&>div]:lg:my-0">
        <div className="w-full flex-[100%] lg:flex-[15%]">
          <SocialLinks socialMedias={socialAccounts} />
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

        <div className="w-full flex justify-start items-start flex-[100%] lg:flex-[33.33%] gap-15">
          {footerColumns &&
            footerColumns.map((column: any) => (
              <div key={column._key} className="">
                <h3 className="font-semibold text-lg">{column.columnTitle}</h3>

                {column.menu && (
                  <ul>
                    {column.menu.items.map((item: any) => (
                      <li key={item._key}>
                        <Link href="#">{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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
