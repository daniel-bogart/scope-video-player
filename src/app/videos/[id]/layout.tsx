// src/app/videos/[id]/layout.tsx
import React from "react";

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="video-layout">{children}</div>;
};

export default VideoLayout;
