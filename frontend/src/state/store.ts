import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./SearchClippers/searchClippers";
import selectCategoryReducer from "./FilterClippers/selectCategory"
import filterClippersReducer from "./FilterClippers/filterClippers"
export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectCategory: selectCategoryReducer,
    clippers: filterClippersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
