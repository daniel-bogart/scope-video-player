"use client";

import React, { useState, FormEvent } from "react";
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
  const [videoUrl, setVideoUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const video: VideoInput = {
      user_id: "daniel_bogart", // Replace with your actual user ID
      title,
      description,
      video_url: videoUrl,
    };

    console.log("Creating video:", video);
    try {
      await dispatch(createVideo(video));
      alert("Video created successfully");
    } catch (error) {
      console.error("Failed to create video:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Video</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
      />
      <button type="submit">Create Video</button>
    </form>
  );
};

export default CreateVideo;
