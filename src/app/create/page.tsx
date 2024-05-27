"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createVideo } from "../../features/videoSlice";
import { AppDispatch } from "../../store/store";

interface VideoInput {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
}

const CreateVideo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl(""); // Clear URL input when file is selected
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setVideoFile(null); // Clear file input when URL is entered
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile && !videoUrl) {
      alert("Please upload a video file or provide a video URL.");
      return;
    }

    let videoSrc = videoUrl;
    if (videoFile) {
      videoSrc = URL.createObjectURL(videoFile);
      console.log("Blob URL:", videoSrc); // Log the blob URL
    }

    const video: VideoInput = {
      user_id: "daniel_bogart", // Replace with your actual user ID
      title,
      description,
      video_url: videoSrc,
    };

    dispatch(createVideo(video));
    alert("Video created successfully");
    console.log("Created Video Object:", video); // Log the created video object
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Video</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <div className="mb-2">
        <label className="block mb-1">Upload Video File:</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Or Enter Video URL:</label>
        <input
          type="url"
          placeholder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={handleUrlChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Video
      </button>
    </form>
  );
};

export default CreateVideo;
