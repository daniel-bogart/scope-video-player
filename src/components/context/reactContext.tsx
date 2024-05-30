import React from "react";

export interface ReactContextType {
  menuActive: boolean;
  setMenuActive: (active: boolean) => void;
  modalComponent: React.ReactNode;
  setModalComponent: (
    component: React.ReactNode | (() => React.ReactNode)
  ) => void;
}

export const ReactContext = React.createContext<ReactContextType>({
  menuActive: false,
  setMenuActive: () => {},
  modalComponent: null,
  setModalComponent: () => {},
});
