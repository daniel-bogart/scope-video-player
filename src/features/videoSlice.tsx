import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "../supabaseClient";
import { AppThunk } from "../store/store";

interface Video {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
}

interface VideoState {
  list: Video[];
}

const initialState: VideoState = {
  list: [], 
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      if (Array.isArray(action.payload)) {
        state.list = action.payload;
      } else {
        console.error("Payload is not an array:", action.payload);
      }
    },
    addVideo: (state, action: PayloadAction<Video>) => {
      state.list.push(action.payload);
    },
  },
});

export const { setVideos, addVideo } = videoSlice.actions;

export const fetchVideos =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://take-home-assessment-423502.uc.r.appspot.com/videos?user_id=${userId}`
      );
      if (Array.isArray(response.data)) {
        dispatch(setVideos(response.data));
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

export const createVideo =
  (video: Omit<Video, "id">): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/videos",
        video
      );
      dispatch(addVideo(response.data));
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

  export const uploadAndCreateVideo =
    (
      videoFile: File,
      videoDetails: Omit<Video, "id" | "video_url">
    ): AppThunk =>
    async (dispatch) => {
      try {
        // Step 1: Upload the video file to Supabase Storage
        const fileExt = videoFile.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("videos")
          .upload(fileName, videoFile);

        if (uploadError) throw uploadError;

        // Step 2: Get the public URL of the uploaded file
        const urlResponse = supabase.storage
          .from("videos")
          .getPublicUrl(fileName);

        // The getPublicUrl doesn't throw an error, so check if publicUrl is undefined
        if (!urlResponse.data.publicUrl)
          throw new Error("Failed to retrieve public URL");

        // Step 3: Create the video entry in the database with the URL
        const video = {
          ...videoDetails,
          video_url: urlResponse.data.publicUrl,
        };
        const response = await axios.post(
          "https://your-api-endpoint/videos",
          video
        );
        dispatch(addVideo({ ...video, id: response.data.id }));
      } catch (error) {
        console.error("Error uploading and creating video:", error);
      }
    };


export default videoSlice.reducer;
