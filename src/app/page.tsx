"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { setVideos } from "../features/videoSlice";
import { RootState, AppDispatch } from "../store/store";
import VideoPlayer from "../components/videoPlayer";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
}

const fetchVideosQuery = async (userId: string): Promise<Video[]> => {
  const { data } = await axios.get(
    `https://take-home-assessment-423502.uc.r.appspot.com/videos?user_id=${userId}`
  );

  console.log("Fetched data from API:", data); // Log API response

  if (data && Array.isArray(data.videos)) {
    return data.videos; // Return the videos array
  } else {
    console.error("API response is not as expected:", data);
    return []; // Return an empty array if the response is not as expected
  }
};

const Home = () => {
  const userId = "daniel_bogart"; // Replace with actual user ID in snake case
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery<Video[], Error>(["videos", userId], () =>
    fetchVideosQuery(userId)
  );

  useEffect(() => {
    if (videos) {
      console.log("Fetched videos in useEffect:", videos); // Log fetched videos
      dispatch(setVideos(videos));
    }
  }, [videos, dispatch]);

  const videoList = useSelector((state: RootState) => state.videos.list);

  useEffect(() => {
    console.log("Global state video list in useEffect:", videoList);
    if (Array.isArray(videoList) && videoList.length > 0) {
      console.log("Video list:", videoList);
    } else {
      console.log("Video list is empty or not an array:", videoList);
    }
  }, [videoList]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10">Error loading videos</div>;

  if (!Array.isArray(videoList) || videoList.length === 0) {
    console.log("Video list is empty or not an array:", videoList);
    return <div className="text-center mt-10">No videos found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Educational Videos</h1>
      <ul className="space-y-4">
        {videoList.map((video: Video) => (
          <li key={video.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <p className="text-gray-700 mb-2">{video.description}</p>
            <VideoPlayer url={video.video_url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
