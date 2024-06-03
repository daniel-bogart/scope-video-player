"use client";

import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  forwardRef,
} from "react";
import Link from "next/link";
import { navLinks } from "../../../data/components/header";
import { usePathname } from "next/navigation";
import { ReactContext, ReactContextType } from "../../context/reactContext";
import Image from "next/image";
import logo from "../../../../public/images/FULL_LOGO_WHITE.png";
import classNames from "classnames";

// Forward ref component for Header
const Header = forwardRef<HTMLElement, {}>((_, ref) => {
  // Get the current pathname
  const pathname = usePathname();
  // State for managing the menu and links
  const [linksMenuOpen, setLinksMenuOpen] = useState(false);
  const { menuActive, setMenuActive } =
    useContext<ReactContextType>(ReactContext);
  const linksRef = useRef<HTMLDivElement>(null);
  const [rootPath, setRootPath] = useState("/");

  // Update the root path based on the current pathname
  useEffect(() => {
    if (!pathname) return;
    const newPath =
      pathname !== "/" ? pathname.split("#")[0].replace(/\/$/, "") : "/";
    setRootPath(newPath);
  }, [pathname]);

  return (
    <header
      ref={ref}
      className="fixed top-0 w-full bg-transparent z-50 h-24 flex justify-center items-center transition-all duration-200 ease-out"
    >
      <div className="w-full flex justify-between items-center py-5 max-w-screen-2xl px-10">
        {/* Render the logo when menu is not active */}
        {!menuActive && (
          <Link href="/" className="flex max-w-xs">
            <Image src={logo} alt="EdTech Logo" width={220} height={88} />
          </Link>
        )}
        <div
          ref={linksRef}
          className={`flex items-center justify-between gap-3 box-border ${
            linksMenuOpen ? "et-header__links--open" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3 box-border">
            {/* Render the logo in the menu when links menu is open */}
            {linksMenuOpen && (
              <div className="max-w-xs">
                <Image
                  src={logo}
                  alt="EdTech Logo White"
                  width={320}
                  height={88}
                  priority
                />
              </div>
            )}
            {/* Render the navigation links for larger screens */}
            <div className="items-center justify-between gap-8 hidden xl:flex">
              {navLinks.map((item) => {
                const { title, url } = item;
                return (
                  <div
                    key={title}
                    onClick={() => {
                      if (menuActive) {
                        setMenuActive(false);
                      }
                    }}
                    className={classNames(
                      "relative h-22 mb-4 mt-2.5 overflow-hidden",
                      {
                        "": rootPath === url,
                      }
                    )}
                  >
                    <Link
                      href={url}
                      className={classNames(
                        "text-white font-light text-lg leading-8 relative before:content-[''] before:bg-white before:h-[2px] before:bottom-[-4px] before:absolute before:w-0 before:left-0 before:right-auto before:transition-all before:duration-300 before:ease-out hover:before:w-full before:[&:not(:hover)]:w-0 before:[&:not(:hover)]:left-auto before:[&:not(:hover)]:right-0",
                        {
                          "after:content-[''] after:bg-white after:h-[2px] after:absolute after:left-0 after:opacity-1 after:w-full after:transition-all after:duration-300 after:ease-out after:bottom-[-4px] after:bottom-[-2px] after:w-full before:hidden":
                            rootPath === url,
                        }
                      )}
                    >
                      {title}
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* Render the navigation links for smaller screens */}
            <div
              className={classNames(
                "fixed flex flex-col items-start justify-center max-w-xs w-full top-28 right-10 bg-white rounded-lg transition-[0.7s_cubic-bezier(0.8,0,0.1,1)] duration-700 ease-in-out w-full",
                {
                  "w-full h-auto py-4 px-2 transition-[0.7s_cubic-bezier(0.8,0,0.1,1)]":
                    menuActive,
                  "w-0 h-0 overflow-hidden transition-[0.7s_cubic-bezier(0.8,0,0.1,1)]":
                    !menuActive,
                }
              )}
            >
              <h5 className="text-gray-500 text-lg font-medium p-3">
                Navigation
              </h5>
              {navLinks.map((item) => {
                const { title, url } = item;
                return (
                  <div
                    key={title}
                    onClick={() => {
                      if (menuActive) {
                        setMenuActive(false);
                      }
                    }}
                    className={`text-xl leading-10 font-medium cursor-pointer py-1 px-5`}
                  >
                    <Link
                      href={url}
                      className={classNames(
                        "text-black font-light text-lg leading-8 relative before:content-[''] before:bg-black before:h-[2px] before:bottom-[-4px] before:absolute before:w-0 before:left-0 before:right-auto before:transition-all before:duration-300 before:ease-out hover:before:w-full before:[&:not(:hover)]:w-0 before:[&:not(:hover)]:left-auto before:[&:not(:hover)]:right-0",
                        {
                          "after:content-[''] after:bg-black after:h-[2px] after:absolute after:left-0 after:opacity-1 after:w-full after:transition-all after:duration-300 after:ease-out after:bottom-[-4px] after:bottom-[-2px] after:w-full before:hidden":
                            rootPath === url,
                        }
                      )}
                    >
                      {title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
