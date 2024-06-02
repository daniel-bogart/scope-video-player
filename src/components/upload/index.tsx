"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createVideo } from "../../features/videoSlice";
import { AppDispatch } from "../../store/store";
import axios from "axios";

interface VideoInput {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
}

const CreateVideo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      alert("Please provide a video URL.");
      return;
    }

    const video: VideoInput = {
      user_id: "daniel_bogart",
      title,
      description,
      video_url: videoUrl,
    };

    try {
      await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/videos",
        video,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(createVideo(video));
      alert("Video created successfully");
    } catch (error) {}
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
      <div className="mb-4">
        <label className="block mb-1">Enter Video URL:</label>
        <input
          type="url"
          placeholder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={handleUrlChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Video
      </button>
    </form>
  );
};

export default CreateVideo;
