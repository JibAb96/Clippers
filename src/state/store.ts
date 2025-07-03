"use client";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Clippers/searchClippers";
import selectCategoryReducer from "./Clippers/selectCategory";
import filterClippersReducer from "./Clippers/clippers";
import selectedClipperReducer from "./Clippers/selectedClipperSlice";
import clipsReducer from "./Clips/clipsSlice";
import isOpenReducer from "./Modal/isOpen";
import userReducer from "./User/usersSlice";
import statusReducer from "./Clips/statusSlice";
import {
  creatorProfileReducer,
  clipperProfileReducer,
} from "./UserLookup/userLookupSlice";

import api from "../services/api";
import type { AxiosInstance } from "axios";

export interface ThunkExtraArgument {
  api: AxiosInstance;
}

export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectCategory: selectCategoryReducer,
    clippers: filterClippersReducer,
    selectedClipper: selectedClipperReducer,
    clips: clipsReducer,
    isOpen: isOpenReducer,
    user: userReducer,
    status: statusReducer,
    creatorProfile: creatorProfileReducer,
    clipperProfile: clipperProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api } as ThunkExtraArgument,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
