import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store/store";

// Define the structure of a Video object
interface Video {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
}

// Define the structure of the video state in the Redux store
interface VideoState {
  list: Video[];
}

// Initial state for the video slice
const initialState: VideoState = {
  list: [],
};

// Create a slice for videos with initial state and reducers
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    // Reducer to set the list of videos
    setVideos: (state, action: PayloadAction<Video[]>) => {
      if (Array.isArray(action.payload)) {
        state.list = action.payload;
      } else {
        console.error("Payload is not an array:", action.payload);
      }
    },
    // Reducer to add a single video to the list
    addVideo: (state, action: PayloadAction<Video>) => {
      state.list.push(action.payload);
    },
  },
});

// Export actions generated from the slice
export const { setVideos, addVideo } = videoSlice.actions;

// Thunk to fetch videos for a specific user
export const fetchVideos =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`/api/videos?userId=${userId}`);
      const videos = await response.json();
      if (response.ok) {
        dispatch(setVideos(videos));
      } else {
        throw new Error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

// Thunk to create a new video
export const createVideo =
  (video: Omit<Video, "id">): AppThunk =>
  async (dispatch) => {
    try {
      // Make an API call to create a new video
      const response = await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/videos",
        video
      );
      // Dispatch action to add the newly created video to the Redux store
      dispatch(addVideo(response.data));
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

// Export the video slice reducer
export default videoSlice.reducer;
