import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store/store";
import { Comment } from "../types/Comment";

interface CommentsState {
  list: {
    [key: string]: Comment[];
  };
}

const initialState: CommentsState = {
  list: {},
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ videoId: string; comments: Comment[] }>
    ) => {
      state.list = {
        ...state.list,
        [action.payload.videoId]: action.payload.comments,
      };
    },
    addComment: (
      state,
      action: PayloadAction<{ videoId: string; comment: Comment }>
    ) => {
      state.list[action.payload.videoId] = [
        ...(state.list[action.payload.videoId] || []),
        action.payload.comment,
      ];
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;

export const fetchComments =
  (videoId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://take-home-assessment-423502.uc.r.appspot.com/videos/comments?video_id=${videoId}`
      );
      if (response.status === 200) {
        dispatch(setComments({ videoId, comments: response.data }));
      } else {
        console.error("Failed to fetch comments:", response.status);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


export const createComment =
  (videoId: string, content: string, userId: string): AppThunk =>
  async (dispatch) => {
    const response = await axios.post(
      "https://take-home-assessment-423502.uc.r.appspot.com/videos/comments",
      {
        video_id: videoId,
        content,
        user_id: userId,
      }
    );
    dispatch(addComment({ videoId, comment: response.data }));
  };

export default commentSlice.reducer;
