import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Clippers/searchClippers";
import selectCategoryReducer from "./Clippers/selectCategory";
import filterClippersReducer from "./Clippers/clippers";
import selectedClipReducer from "./Clip/selectedClip";
import statusReducer from "./Clips/clipStatus"
import clipsReducer from "./Clips/clips"
import isSignedInReducer from "./isSignedIn/isSignedIn"
import isOpenReducer from "./Modal/isOpen"
import userReduser from "./User/user"
export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectCategory: selectCategoryReducer,
    clippers: filterClippersReducer,
    clip: selectedClipReducer,
    status: statusReducer,
    clips: clipsReducer,
    isSignedIn: isSignedInReducer,
    isOpen: isOpenReducer,
    user: userReduser
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
