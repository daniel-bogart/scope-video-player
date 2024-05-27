import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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
  list: [], // Ensure initial state is an empty array
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.list = action.payload;
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
      dispatch(setVideos(response.data));
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

export default videoSlice.reducer;
