import React from "react";
import CTA from "../../button";
import Image from "next/image";
import success from "../../../../public/images/success.jpeg"
import useModal from "@/lib/useModal";

const Success = () => {
  const { closeModal } = useModal();
  return (
    <div className="relative flex flex-col p-8 gap-5 items-center justify-center w-full max-w-screen-sm sm:h-[240px] h-[60vh] rounded-lg">
      <h3 className="text-2xl text-white text-center z-10">Upload successful! 🎉</h3>
      <div className="flex sm:flex-row flex-col items-center justify-center gap-2 z-10">
        <CTA to="/explore">Keep exploring</CTA>
        <CTA onClick={closeModal}>Contribute more</CTA>
      </div>
      <div className="absolute top-0 left-0 w-full h-full brightness-60">
        <Image
          src={success}
          alt="Success illustration"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default Success;
