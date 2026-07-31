"use client";

import { useState } from "react";
import Link from "next/link";

interface NotificationBarProps {
  text?: string;
  link?: string;
  linkText?: string;
  bgColor?: string;
  textColor?: string;
}

export const NotificationBar = ({
  text,
  link,
  linkText,
  bgColor,
  textColor,
}: NotificationBarProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (!text || dismissed) return null;

  const style: React.CSSProperties = {};
  if (bgColor) style.backgroundColor = bgColor;
  if (textColor) style.color = textColor;

  return (
    <div
      className="bg-black text-white text-xs sm:text-sm py-2 px-4 transition-all duration-300 relative flex items-center justify-between z-10"
      style={style}
      role="region"
      aria-label="Notification bar"
    >
      <div className="flex-1 text-center font-medium pr-6 sm:pr-0">
        <span>{text}</span>
        {link && (
          <Link
            href={link}
            className="ml-2 underline hover:opacity-80 transition-opacity font-semibold inline-flex items-center gap-0.5"
          >
            {linkText || "Learn More"} &rarr;
          </Link>
        )}
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-current opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
        aria-label="Close notification bar"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
