import { useState, useEffect } from "react";

const useCheckScreenSize = (breakpoint: number) => {
  const isBrowser = typeof window !== "undefined";

  const initialSize = isBrowser ? window.innerWidth <= breakpoint : false;

  const [isMobile, setIsMobile] = useState(initialSize);

  useEffect(() => {
    if (!isBrowser) return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint, isBrowser]);

  return isMobile;
};

export { useCheckScreenSize };
