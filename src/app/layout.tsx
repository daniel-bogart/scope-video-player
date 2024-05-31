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
    if (headerRef.current) {
      const header = headerRef.current;
      gsap.set(header, { y: -header.offsetHeight });

      ScrollTrigger.create({
        start: "top+=150 top",
        end: "bottom bottom",
        trigger: header,
        onEnter: () => {
          gsap.to(header, {
            y: -header.offsetHeight,
            duration: 0.1,
            delay: 0.25,
            ease: "power1.inOut",
            onComplete: () => setShowFloatingButton(true),
          });
        },
        onLeaveBack: () => {
          gsap.to(header, {
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
  }, []);

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
              <div className="et-main">{children}</div>
              <FloatingNav/>
            </ReactContext.Provider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
