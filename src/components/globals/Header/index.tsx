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
import logo from "../../../images/FULL_LOGO_WHITE.png";

const Header = forwardRef<HTMLElement, {}>((_, ref) => {
  const pathname = usePathname();
  const [linksMenuOpen, setLinksMenuOpen] = useState(false);
  const { menuActive, setMenuActive } =
    useContext<ReactContextType>(ReactContext);
  const linksRef = useRef<HTMLDivElement>(null);
  const [rootPath, setRootPath] = useState("/");

  useEffect(() => {
    if (!pathname) return;
    const newPath =
      pathname !== "/" ? pathname.split("#")[0].replace(/\/$/, "") : "/";
    setRootPath(newPath);
  }, [pathname]);

  return (
    <header
      ref={ref}
      className="fixed top-0 w-full bg-black z-50 h-24 flex justify-center items-center transition-all duration-200 ease-out"
    >
      <div className="w-full flex justify-between items-center py-5 max-w-screen-xl px-10">
        {!menuActive && (
          <Link href="/" className="flex max-w-xs">
            <Image src={logo} alt="PCM Logo" width={220} height={88} />
          </Link>
        )}
        <div
          ref={linksRef}
          className={`flex items-center justify-between gap-3 box-border ${
            linksMenuOpen ? "pcm-header__links--open" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3 box-border">
            {linksMenuOpen && (
              <div className="max-w-xs">
                <Image
                  src={logo}
                  alt="PCM Logo White"
                  width={320}
                  height={88}
                />
              </div>
            )}
            <div className="flex items-center justify-between gap-8">
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
                    className={`relative h-22 mb-4 mt-2.5 overflow-hidden ${
                      rootPath === url ? "border-b-2 border-white" : ""
                    }`}
                  >
                    <Link
                      href={url}
                      className="text-white font-light text-lg leading-8"
                    >
                      {title}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              className={`fixed flex flex-col items-start justify-center max-w-xs w-full top-28 right-10 bg-white rounded-lg transition-all duration-700 ease-in-out ${
                menuActive ? "h-auto py-4 px-2" : "h-0 overflow-hidden"
              }`}
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
                    className={`text-xl leading-10 font-medium cursor-pointer py-1 px-5 ${
                      rootPath === url ? "border-b-2 border-black" : ""
                    }`}
                  >
                    <Link href={url} className="text-black">
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

Header.displayName = "Header"; // Optional but helpful for debugging

export default Header;
