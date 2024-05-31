import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store/store";

interface Comment {
  id: string;
  text: string;
}

interface CommentsState {
  list: {
    [key: string]: Comment[];
  };
}

const initialState: CommentsState = {
  list: {},
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ videoId: string; comments: Comment[] }>
    ) => {
      state.list[action.payload.videoId] = action.payload.comments;
    },
    addComment: (
      state,
      action: PayloadAction<{ videoId: string; comment: Comment }>
    ) => {
      const { videoId, comment } = action.payload;
      if (!state.list[videoId]) {
        state.list[videoId] = [];
      }
      state.list[videoId].push(comment);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;

export const fetchComments =
  (videoId: string): AppThunk =>
  async (dispatch) => {
    const response = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos/comments?video_id=${videoId}`
    );
    dispatch(setComments({ videoId, comments: response.data }));
  };

export const createComment =
  (videoId: string, comment: Partial<Comment>): AppThunk =>
  async (dispatch) => {
    const response = await axios.post(
      "https://take-home-assessment-423502.uc.r.appspot.com/videos/comments",
      comment
    );
    dispatch(addComment({ videoId, comment: response.data }));
  };

export default commentSlice.reducer;
