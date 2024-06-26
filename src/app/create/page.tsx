"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createVideo } from "../../features/videoSlice";
import { AppDispatch } from "../../store/store";
import { isValidVideoUrl } from "@/lib/isValidUrl";
import { Success } from "@/components/create";
import useModal from "@/lib/useModal";
import Image from "next/image";
import alpine from "../../../public/images/alpine.jpg";
import CTA from "../../components/button";
import axios from "axios";

// Define the structure for the video input data
interface VideoInput {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
}

// Functional component for creating a new video
const CreateVideo: React.FC = () => {
  // State variables for form inputs and error handling
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();

  // Handle changes in the video URL input field
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check if video URL is provided
    if (!videoUrl) {
      setError("Please provide a video URL.");
      return;
    }

    // Validate if the URL is from YouTube or Vimeo
    const isYoutubeOrVimeo = (url: string) => {
      const youtubePattern =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      const vimeoPattern = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/;
      return youtubePattern.test(url) || vimeoPattern.test(url);
    };

    if (!isYoutubeOrVimeo(videoUrl)) {
      setError("Please provide a valid YouTube or Vimeo URL.");
      return;
    }

    // Check if the URL is accessible and valid
    const isUrlValid = await isValidVideoUrl(videoUrl);

    if (!isUrlValid) {
      setError("The provided URL is not valid or accessible.");
      return;
    }

    // Construct the video object to be sent to the server
    const video: VideoInput = {
      user_id: "daniel_bogart",
      title,
      description,
      video_url: videoUrl,
    };

    try {
      // Make an API call to create a new video
      await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/videos",
        video,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Dispatch the action to update the Redux store
      dispatch(createVideo(video));
      // Open success modal
      openModal(<Success />);
      // Reset form fields
      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error creating video:", error);
      setError("Error creating video. Please try again later.");
    }
  };

  return (
    <div className="relative h-[100vh] flex flex-col items-center w-full justify-center">
      <div className="absolute flex flex-col inset-0 flex items-center justify-center z-30 gap-10 px-5">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-4 bg-black max-w-screen-sm w-full rounded-lg"
        >
          <h1 className="text-2xl text-white font-bold mb-4">
            Create New Video
          </h1>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mb-2 p-2 border-2 bg-black text-white rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mb-2 p-2 border-2 rounded bg-black text-white"
          />
          <div className="mb-4 bg-transparent">
            <label className="text-white block mb-1">
              Enter Video URL from Youtube or Vimeo:
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/video-id"
              value={videoUrl}
              onChange={handleUrlChange}
              className="text-white w-full p-2 border-2 border-white bg-transparent rounded"
              required
            />
          </div>
          <CTA type="submit">Create Video</CTA>
        </form>
      </div>
      <Image
        src={alpine}
        alt="alpine"
        layout="fill"
        objectFit="cover"
        className="brightness-70"
      />
    </div>
  );
};

export default CreateVideo;
