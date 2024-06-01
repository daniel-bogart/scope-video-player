"use client";

import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../store/store";
import {
  ReactContext,
  ReactContextType,
} from "../components/context/reactContext";
import "../styles/globals.scss";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, FloatingNav } from "../components/globals";
import { useCheckScreenSize } from "../lib/checkScreenSize";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const floatingButtonRef = useRef<HTMLDivElement>(null);

  const isTablet = useCheckScreenSize(1200);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      (lenis as any).off("scroll");
      cancelAnimationFrame(rafId);
    };
  }, [menuActive]);

  useEffect(() => {
    if (isTablet && headerRef.current) {
      gsap.set(headerRef.current, {
        y: -headerRef.current.offsetHeight,
      });
      setShowFloatingButton(true);
      return;
    }

    if (headerRef.current && !isTablet) {
      const header = headerRef.current;
      ScrollTrigger.create({
        start: "top+=150 top",
        end: "bottom bottom",
        trigger: headerRef.current,
        onEnter: () => {
          gsap.to(headerRef.current, {
            y: -header.offsetHeight,
            duration: 0.1,
            delay: 0.25,
            ease: "power1.inOut",
            onComplete: () => setShowFloatingButton(true),
          });
        },
      });

      ScrollTrigger.create({
        start: "top+=100 top",
        end: "bottom bottom",
        trigger: headerRef.current,
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.25,
            ease: "power1.inOut",
            onComplete: () => {
              setShowFloatingButton(false);
              setMenuActive(false);
            },
          });
        },
      });
    }
  }, [setShowFloatingButton, setMenuActive, isTablet]);

  const reactContextValue: ReactContextType = {
    menuActive,
    setMenuActive,
    modalComponent,
    setModalComponent,
    showFloatingButton,
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ReactContext.Provider value={reactContextValue}>
              <Header ref={headerRef} />
              <div
                className={classNames(
                  "relative bg-black w-full transition-all duration-300 ease-out after:z-40 after:content-[''] after:absolute after:bg-[rgba(0,0,0,0.5)] after:w-full after:top-0 after:h-full after:left-0 after:transition-all after:duration-300 after:ease-out after:pointer-events-none min-h-screen",
                  {
                    "after:opacity-1": menuActive,
                    "after:opacity-0": !menuActive,
                  }
                )}
              >
                {children}
              </div>
              <FloatingNav />
            </ReactContext.Provider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
