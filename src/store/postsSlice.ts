import { Post, PostsState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MAX_POSTS = 50;

const initialState: PostsState = {
  posts: JSON.parse(localStorage.getItem("posts") || "[]"),
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      if (state.posts.length > MAX_POSTS) {
        state.posts = state.posts.slice(0, MAX_POSTS);
      }
      try {
        localStorage.setItem("posts", JSON.stringify(state.posts));
      } catch (error) {
        console.error("Error saving posts:", error);
      }
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
        try {
          localStorage.setItem("posts", JSON.stringify(state.posts));
        } catch (error) {
          console.error("Error updating posts:", error);
        }
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      try {
        localStorage.setItem("posts", JSON.stringify(state.posts));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
