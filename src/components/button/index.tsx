// CTA.tsx
import React from "react";
import Link from "next/link";
import { CTAProps } from "./types";

// Define a type for the themes
type ThemeType = "hollow" | "orange" | "mint";

// Use the ThemeType to define the themeClasses structure
const themeClasses: Record<ThemeType, string> = {
  hollow: "bg-transparent border border-white text-white",
  orange: "bg-orange text-white hover:text-white",
  mint: "bg-mint text-white",
};

const CTA: React.FC<CTAProps> = ({
  children,
  to,
  className = "",
  theme = "hollow", // Default to 'hollow' or another valid theme
}) => {
  const baseClasses =
    "group w-full relative flex items-center justify-center cursor-pointer overflow-hidden rounded-full px-8 py-4 gap-3";

  return (
    <Link href={to} passHref>
      <div className={`${baseClasses} ${themeClasses[theme]} ${className}`}>
        <p className="transition-all ease-in-out duration-600 z-10 relative">
          {children}
        </p>
        <span className="absolute w-6 h-6 bg-mint rounded-full top-1/2 right-8 -translate-y-1/2 z-0 transition-transform duration-450 transition-anim group-hover:w-full group-hover:h-full top-[50%] group-hover:right-[0%] group-hover:scale-200"></span>
        <div className="h-6 w-6 bg-mint rounded-full flex items-center justify-center overflow-hidden z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              className="transform transition-all ease-in-out duration-450 group-hover:translate-x-full"
              fill="var(--white)"
              d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z"
            />
            <path
              className="transform transition-all ease-in-out duration-450 translate-x-[-100%] group-hover:translate-x-[0%]"
              fill="var(--white)"
              d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CTA;