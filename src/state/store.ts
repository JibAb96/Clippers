"use client";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Clippers/searchClippers";
import selectCategoryReducer from "./Clippers/selectCategory";
import filterClippersReducer from "./Clippers/clippers";
import selectedClipperReducer from "./Clippers/selectedClipperSlice";

import clipsReducer from "./Clips/clipsSlice";
import isSignedInReducer from "./isSignedIn/isSignedIn";
import isOpenReducer from "./Modal/isOpen";
import userReducer from "./User/user";
import statusReducer from "./Clips/statusSlice";
import {
  creatorProfileReducer,
  clipperProfileReducer,
} from "./Profiles/profileSlices";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectCategory: selectCategoryReducer,
    clippers: filterClippersReducer,
    selectedClipper: selectedClipperReducer,

    clips: clipsReducer,
    isSignedIn: isSignedInReducer,
    isOpen: isOpenReducer,
    user: userReducer,
    status: statusReducer,
    creatorProfile: creatorProfileReducer,
    clipperProfile: clipperProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
