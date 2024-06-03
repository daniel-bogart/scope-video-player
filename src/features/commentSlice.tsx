import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

// Define the structure of a Comment object
interface Comment {
  id: string;
  content: string;
  user_id: string;
  video_id: string;
  created_at: string;
}

// Define the structure of the comments state in the Redux store
interface CommentsState {
  list: Record<string, Comment[]>;
}

// Initial state for the comments slice
const initialState: CommentsState = {
  list: {},
};

// Async thunk to fetch comments for a specific video
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

// Async thunk to create a new comment
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

// Create a slice for comments with initial state and reducers
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // Reducer to set the list of comments for a specific video
    setComments: (
      state,
      action: PayloadAction<{ videoId: string; comments: Comment[] }>
    ) => {
      state.list = {
        ...state.list,
        [action.payload.videoId]: action.payload.comments,
      };
    },
    // Reducer to add a single comment to the list of a specific video
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
    // Handle fulfilled state of fetchComments thunk
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const videoId = action.meta.arg;
        state.list[videoId] = action.payload || [];
      })
      // Handle rejected state of fetchComments thunk
      .addCase(fetchComments.rejected, (state, action) => {
        const videoId = action.meta.arg;
        state.list[videoId] = [];
      })
      // Handle fulfilled state of createComment thunk
      .addCase(createComment.fulfilled, (state, action) => {
        const { video_id: videoId } = action.payload;
        if (!Array.isArray(state.list[videoId])) {
          state.list[videoId] = [];
        }
        state.list[videoId].push(action.payload);
      });
  },
});

// Export actions generated from the slice
export const { setComments, addComment } = commentSlice.actions;

// Export the comments slice reducer
export default commentSlice.reducer;
