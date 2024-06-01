"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { notFound } from "next/navigation";
import { fetchComments, createComment } from "../../../features/commentSlice";
import { RootState, AppDispatch } from "../../../store/store"; // Ensure these imports are correct
import { CommentList, CommentForm } from "../../../components/comments";
import { Video } from "../../../types/Video";
import Description from "../../../components/description";

interface VideoPageProps {
  params: { id: string };
}

const fetchVideo = async (id: string): Promise<Video | null> => {
  try {
    const { data } = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos/single?video_id=${id}`
    );
    if (data && data.video) {
      return data.video;
    }
    return null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

const VideoPlayer = dynamic(() => import("../../../components/videoPlayer"), {
  ssr: false,
});

const VideoPage = ({ params }: VideoPageProps) => {
  const videoId = params.id;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  // Fetch comments from the Redux store
  const comments = useSelector(
    (state: RootState) => state.comments.list[videoId] || [],
    shallowEqual
  );


  useEffect(() => {
    const loadVideo = async () => {
      const videoData = await fetchVideo(videoId);
      if (!videoData) {
        notFound();
      } else {
        setVideo(videoData);
      }
      setLoading(false);
    };
    loadVideo();
  }, [videoId]);

  useEffect(() => {
    const loadComments = async () => {
      setLoadingComments(true);
      dispatch(fetchComments(videoId));
      setLoadingComments(false);
    };
    loadComments();
  }, [dispatch, videoId]);

  const handleAddComment = async (content: string, userId: string) => {
    dispatch(createComment(videoId, content, userId));
    dispatch(fetchComments(videoId)); // Refresh comments
  };

  useEffect(() => {
    console.log("Comments updated:", comments);
  }, [comments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full box-border">
      <div className="flex flex-col items-center justify-center w-full max-w-video-vw w-full py-20 box-border">
        <VideoPlayer url={video.video_url} />
        <div className="w-full py-10">
          <h1 className="text-2xl font-bold mb-4 text-white">{video.title}</h1>
          <Description description={video.description} />
        </div>
        <div className="w-full py-10">
          <h2 className="text-xl font-bold mb-4 text-white after:">Comments</h2>
          <CommentForm onAddComment={handleAddComment} />
          <CommentList
            comments={{ comments: (comments as any).comments }}
            loading={loadingComments}
          />

        </div>
      </div>
    </div>
  );
};

export default VideoPage;
