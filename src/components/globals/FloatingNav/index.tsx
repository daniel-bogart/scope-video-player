import React, { useEffect, useRef, useContext, useState } from "react";
import classNames from "classnames";
import { ReactContext, ReactContextType } from "../../context/reactContext";

const FloatingNavButton: React.FC = () => {
  // Access menu state and floating button visibility from context
  const { menuActive, setMenuActive, showFloatingButton } =
    useContext<ReactContextType>(ReactContext);
  const floatingButtonRef = useRef<HTMLDivElement>(null);

  // Determine the classes for the floating navigation button
  const floatingNavClasses = classNames(
    "group fixed z-[9999] flex items-center justify-center rounded-full transition-all duration-300 ease-out mix-blend-difference cursor-pointer",
    {
      // Styles when the floating button is visible and the menu is not active
      "sm:w-20 w-16 sm:h-20 h-16 sm:right-14 right-12 sm:top-8 top-6 bg-white":
        showFloatingButton && !menuActive,
      // Styles when the floating button is visible and the menu is active
      "sm:w-20 w-16 sm:h-20 h-16 sm:right-14 right-12 sm:top-8 top-6 transform rotate-180 bg-white hover:rotate-0":
        showFloatingButton && menuActive,
      // Styles when the floating button is hidden
      "w-0 h-0 bg-transparent": !showFloatingButton,
    }
  );

  // Determine the classes for the hamburger button inside the floating nav button
  const hamburgerClasses = classNames(
    "floating-nav-button flex flex-col items-center justify-center gap-2 p-0 border-none bg-none cursor-pointer transition-all duration-300 ease-out",
    {
      active: menuActive, // Apply the 'active' class when the menu is active
    }
  );

  return (
    <div
      ref={floatingButtonRef}
      className={floatingNavClasses}
      onClick={() => setMenuActive(!menuActive)} // Toggle the menu active state on click
    >
      <button className={hamburgerClasses}>
        {/* Top line of the hamburger icon */}
        <span
          className={classNames(
            "bg-black w-8 h-1 transition-all duration-300 ease-out",
            {
              "transform rotate-[-45deg] translate-x-[0px] translate-y-[11px] h-[2px] w-8":
                menuActive, // Rotate and transform when menu is active
              "w-8 group-hover:w-6": !menuActive, // Adjust width on hover when menu is not active
            }
          )}
        />
        {/* Middle line of the hamburger icon */}
        <span
          className={classNames(
            "bg-black w-8 h-0.5 transition-all duration-300 ease-out",
            {
              "transform rotate-[45deg] translate-x-[1px] translate-y-[-0px] h-[2px]":
                menuActive, // Rotate and transform when menu is active
              "w-8 group-hover:w-9": !menuActive, // Adjust width on hover when menu is not active
            }
          )}
        />
        {/* Bottom line of the hamburger icon */}
        <span
          className={classNames(
            "bg-black w-8 h-1 transition-all duration-300 ease-out",
            {
              "transform rotate-[-45deg] translate-x-[1px] translate-y-[-10px] w-8 h-[2px]":
                menuActive, // Rotate and transform when menu is active
              "w-8 group-hover:w-6": !menuActive, // Adjust width on hover when menu is not active
            }
          )}
        />
      </button>
    </div>
  );
};

export default FloatingNavButton;
