// src/features/commentSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    list: {},
  },
  reducers: {
    setComments: (state, action) => {
      state.list[action.payload.videoId] = action.payload.comments;
    },
    addComment: (state, action) => {
      const { videoId, comment } = action.payload;
      if (!state.list[videoId]) {
        state.list[videoId] = [];
      }
      state.list[videoId].push(comment);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;

export const fetchComments = (videoId) => async (dispatch) => {
  const response = await axios.get(
    `https://take-home-assessment-423502.uc.r.appspot.com/videos/comments?video_id=${videoId}`
  );
  dispatch(setComments({ videoId, comments: response.data }));
};

export const createComment = (videoId, comment) => async (dispatch) => {
  const response = await axios.post(
    "https://take-home-assessment-423502.uc.r.appspot.com/videos/comments",
    comment
  );
  dispatch(addComment({ videoId, comment: response.data }));
};

export default commentSlice.reducer;
