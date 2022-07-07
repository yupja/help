import { configureStore } from "@reduxjs/toolkit";
import save from "./modules/saveList";
import goal from "./modules/goal";
import favorite from "./modules/favorite";
import post from "./modules/post";
import comment from "./modules/comment";
import saved from "./modules/saved";
import postDetail from "./modules/postDetail";

const store = configureStore({
  reducer: { save, goal, favorite, post, comment, saved, postDetail},
});

export default store;
