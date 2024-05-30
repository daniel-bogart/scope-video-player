// @ts-nocheck

import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Video } from "../../types/Video"; // Ensure you import the Video interface

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from<Video>("videos").select("*");

      if (error) {
        console.error("Error fetching videos from Supabase:", error);
      } else {
        setVideos((data as Video[]) || []);
      }
    };

    fetchVideos();
  }, []);

  const handleAddVideo = async () => {
    const newVideo: Omit<Video, "id"> = {
      user_id: "user123",
      description: "A new video",
      video_url: "http://example.com/video.mp4",
      title: "New Video",
    };

    const { data, error } = await supabase
      .from<Video>("videos")
      .insert([newVideo])
      .single();

    if (error) {
      console.error("Error adding video to Supabase:", error);
    } else if (data) {
      setVideos((prevVideos) => [...prevVideos, data]);
    }
  };

  return (
    <div>
      <h1>Videos</h1>
      <button onClick={handleAddVideo}>Add Video</button>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
