import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    uploadPost: (state, action) => {
      // if (action.payload.length === 0) return;
      state.post.push(action.payload);
    },
    deletePost: (state, action) => {
      state.post = state.post.filter((post) => post.$id !== action.payload);
    },
    emptyPost: (state) => {
      state.post = [];
    },
    updatePost: (state, action) => {},
  },
});

export const { uploadPost, deletePost, updatePost, emptyPost } =
  postSlice.actions;
export default postSlice.reducer;
