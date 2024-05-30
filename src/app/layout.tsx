"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../store/store";
import {
  ReactContext,
  ReactContextType,
} from "../components/context/reactContext";
import "../styles/globals.scss";
import Lenis from "@studio-freight/lenis";
import { Header } from "../components/globals";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);

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

  const reactContextValue: ReactContextType = {
    menuActive,
    setMenuActive,
    modalComponent,
    setModalComponent,
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ReactContext.Provider value={reactContextValue}>
              <Header />
              <div className="et-main">{children}</div>
            </ReactContext.Provider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
