import React, { useContext } from "react";
import { ReactContext } from "../../components/context/reactContext";
import "./modal.scss";
import classNames from "classnames";

const useModal = () => {
  const context = useContext(ReactContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ReactContext provider");
  }

  const { setModalComponent } = context;
  const closeModal = () => {
    setModalComponent(null);
  };

  const openModal = (
    ModalComponent: React.ReactNode,
    background: boolean = false
  ) => {
    const innerClasses = classNames(
      "flex flex-col items-center justify-start absolute top-1/2 left-1/2 transform modal-translate w-full box-border px-5 box-border",
      {
        "bg-white border-2 border-primary p-10 rounded-2xl transition duration-300":
          background,
      }
    );

    setModalComponent(
      <div
        className="modal fixed inset-0 z-[1004] w-full h-full backface-hidden backdrop-blur-[5px] backdrop-brightness-70 fixed inset-0 w-screen h-screen overflow-hidden transition-opacity duration-300 ease-out"
        onClick={() => closeModal()}
      >
        <div className={innerClasses}>{ModalComponent}</div>
      </div>
    );
  };

  return { openModal, closeModal };
};

export default useModal;
