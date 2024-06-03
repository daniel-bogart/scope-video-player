import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

interface Comment {
  id: string;
  content: string;
  user_id: string;
  video_id: string;
  created_at: string;
}

interface CommentsState {
  list: Record<string, Comment[]>;
}

const initialState: CommentsState = {
  list: {},
};

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  { state: RootState }
>("comments/fetchComments", async (videoId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos/comments?video_id=${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return rejectWithValue([]);
  }
});

export const createComment = createAsyncThunk<
  Comment,
  { videoId: string; content: string; userId: string },
  { state: RootState }
>(
  "comments/createComment",
  async ({ videoId, content, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://take-home-assessment-423502.uc.r.appspot.com/videos/comments",
        {
          video_id: videoId,
          content,
          user_id: userId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return rejectWithValue(error);
    }
  }
);

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
      if (!Array.isArray(state.list[action.payload.videoId])) {
        state.list[action.payload.videoId] = [];
      }
      state.list[action.payload.videoId].push(action.payload.comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const videoId = action.meta.arg;
        state.list[videoId] = action.payload || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const videoId = action.meta.arg;
        state.list[videoId] = [];
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { video_id: videoId } = action.payload;
        if (!Array.isArray(state.list[videoId])) {
          state.list[videoId] = [];
        }
        state.list[videoId].push(action.payload);
      });
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
