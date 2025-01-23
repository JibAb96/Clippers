import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Clippers/searchClippers";
import selectCategoryReducer from "./Clippers/selectCategory";
import filterClippersReducer from "./Clippers/filterClippers";
import selectedClipReducer from "./Clip/selectedClip";
import statusReducer from "./Clips/clipStatus"
import clipsReducer from "./Clips/clips"
import isSignedInReducer from "./isSignedIn/isSignedIn"
export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectCategory: selectCategoryReducer,
    clippers: filterClippersReducer,
    clip: selectedClipReducer,
    status: statusReducer,
    clips: clipsReducer,
    isSignedIn: isSignedInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
