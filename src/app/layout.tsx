"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../store/store";
import "../styles/globals.css";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
