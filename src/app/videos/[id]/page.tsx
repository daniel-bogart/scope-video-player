// src/app/videos/[id]/page.tsx
"use client";

import axios from "axios";
import { Video } from "../../../types/Video";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

interface VideoPageProps {
  params: { id: string };
}

const fetchVideo = async (id: string): Promise<Video | null> => {
  try {
    const { data } = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos/single?video_id=${id}`
    );
    console.log("Fetched video data:", data);

    // Assuming data contains the video object directly or within another object
    if (data && data.video) {
      return data.video; // Adjust this based on the actual structure
    }
    return data; // Return data if it directly contains the video
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

const VideoPlayer = dynamic(() => import("../../../components/videoPlayer"), {
  ssr: false,
});

const VideoPage = async ({ params }: VideoPageProps) => {
  const video = await fetchVideo(params.id);

  if (!video) {
    notFound();
    return null; // This return is necessary to stop execution
  }

  console.log("Video in VideoPage:", video);

  // Ensuring the structure of the video object
  const videoUrl = video?.video_url;
  console.log("Video URL in VideoPage:", videoUrl);

  return (
    <div className="max-w-2xl mx-auto p-4 pt-[100px]">
      <h1 className="text-2xl font-bold mb-4">{video?.title}</h1>
      <p className="text-gray-700 mb-4">{video?.description}</p>
      <VideoPlayer url={videoUrl} />
    </div>
  );
};

export default VideoPage;
