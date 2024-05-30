// src/services/videoService.ts
import supabase from "../supabaseClient";
import { fetchVideos, createVideo } from "../apiClient";

export const syncVideosToSupabase = async () => {
  const videos = await fetchVideos();
  const { data, error } = await supabase.from("videos").insert(videos);
  if (error) {
    console.error("Error inserting videos into Supabase:", error);
  }
  return data;
};

export const addVideoToSupabase = async (video: {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
}) => {
  const apiVideo = await createVideo(video);
  const { data, error } = await supabase.from("videos").insert([apiVideo]);
  if (error) {
    console.error("Error inserting video into Supabase:", error);
  }
  return data;
};
