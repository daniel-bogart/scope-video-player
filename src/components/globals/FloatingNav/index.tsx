import React, { useEffect, useRef, useContext, useState } from "react";
import classNames from "classnames";
import { ReactContext, ReactContextType } from "../../context/reactContext";

const FloatingNavButton: React.FC = () => {
  const { menuActive, setMenuActive, showFloatingButton } =
    useContext<ReactContextType>(ReactContext);
  const floatingButtonRef = useRef<HTMLDivElement>(null);

  const floatingNavClasses = classNames(
    "group fixed z-[9999] flex items-center justify-center rounded-full transition-all duration-300 ease-out mix-blend-difference cursor-pointer",
    {
      "w-20 h-20 right-10 top-10 bg-white": showFloatingButton && !menuActive,
      "w-20 h-20 right-10 top-10 transform rotate-180 bg-white hover:rotate-0":
        showFloatingButton && menuActive,
      "w-0 h-0 bg-transparent": !showFloatingButton,
    }
  );

  const hamburgerClasses = classNames(
    "floating-nav-button flex flex-col items-center justify-center gap-2 p-0 border-none bg-none cursor-pointer transition-all duration-300 ease-out",
    {
      active: menuActive,
    }
  );

  console.log("showFloatingButton:", showFloatingButton);
  console.log("menuActive:", menuActive);

  return (
    <div
      ref={floatingButtonRef}
      className={floatingNavClasses}
      onClick={() => setMenuActive(!menuActive)}
    >
      <button className={hamburgerClasses}>
        <span
          className={classNames(
            "bg-black w-8 h-1 transition-all duration-300 ease-out",
            {
              "transform rotate-[-45deg] translate-x-[0px] translate-y-[11px] h-[2px] w-8":
                menuActive,
              "w-8 group-hover:w-6": !menuActive,
            }
          )}
        />
        <span
          className={classNames(
            "bg-black w-8 h-0.5 transition-all duration-300 ease-out",
            {
              "transform rotate-[45deg] translate-x-[1px] translate-y-[-0px] h-[2px]":
                menuActive,
              "w-8 group-hover:w-9": !menuActive,
            }
          )}
        />
        <span
          className={classNames(
            "bg-black w-8 h-1 transition-all duration-300 ease-out",
            {
              "transform rotate-[-45deg] translate-x-[1px] translate-y-[-10px] w-8 h-[2px]":
                menuActive,
              "w-8 group-hover:w-6": !menuActive,
            }
          )}
        />
      </button>
    </div>
  );
};

export default FloatingNavButton;
