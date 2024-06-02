// src/app/videos/[id]/layout.tsx
import React from "react";

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="video-layout flex flex-col items-center justify-center">{children}</div>;
};

export default VideoLayout;
