import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allpost: [],
  followerPost: [],
  loading: false,
  likePost: null,
  bookmarkPost: null,
  error: false,
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postStart: (state) => {
      state.loading = true;
    },
    postSuccess: (state, action) => {
      state.loading = false;
      state.allpost = action.payload;
    },
    postError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { postStart, postSuccess, postError } = PostSlice.actions;

export default PostSlice.reducer;
