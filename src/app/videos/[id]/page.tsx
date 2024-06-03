"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { notFound } from "next/navigation";
import { fetchComments, createComment } from "../../../features/commentSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { CommentList, CommentForm } from "../../../components/comments";
import { Video } from "../../../types/Video";
import Description from "../../../components/description";

// Define the properties for the VideoPage component
interface VideoPageProps {
  params: { id: string };
}

// Function to fetch video data by ID
const fetchVideo = async (id: string): Promise<Video | null> => {
  try {
    const response = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos/single?video_id=${id}`
    );
    if (response.data && response.data.video) {
      return response.data.video;
    }
    return null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

// Dynamic import for the VideoPlayer component to disable server-side rendering
const VideoPlayer = dynamic(() => import("../../../components/videoPlayer"), {
  ssr: false,
});

// Main component for the video page
const VideoPage = ({ params }: VideoPageProps) => {
  const videoId = params.id;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  // Selector to retrieve comments from the Redux store
  const comments = useSelector(
    (state: RootState) => state.comments.list[videoId] || []
  );

  // Effect to load video data and comments when the component mounts or videoId changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const videoData = await fetchVideo(videoId);
      if (!videoData) {
        notFound(); // Navigate to 404 page if video not found
        setLoading(false);
        return;
      }
      setVideo(videoData);
      await dispatch(fetchComments(videoId));
      setLoading(false);
      setLoadingComments(false);
    };
    loadData();
  }, [dispatch, videoId]);

  // Handle the addition of a new comment
  const handleAddComment = async (content: string, userId: string) => {
    await dispatch(createComment({ videoId, content, userId }));
    await dispatch(fetchComments(videoId)); // Refresh comments
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display message if video is not found
  if (!video) {
    return <div>Video not found</div>;
  }

  // Render the video page content
  return (
    <div className="flex flex-col items-center justify-center w-full box-border">
      <div className="flex flex-col items-center justify-center w-full max-w-video-vw w-full py-20 box-border md:px-10 px-5">
        <VideoPlayer url={video.video_url} />
        <div className="w-full py-10">
          <h1 className="text-2xl font-bold mb-4 text-white">{video.title}</h1>
          <Description description={video.description} />
        </div>
        <div className="flex flex-col gap-6 w-full py-10">
          <h2 className="text-xl font-bold mb-4 text-white">Comments</h2>
          <CommentForm onAddComment={handleAddComment} />
          <span className="flex w-full h-[1px] bg-neutral-600"></span>
          <CommentList comments={comments} loading={loadingComments} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
