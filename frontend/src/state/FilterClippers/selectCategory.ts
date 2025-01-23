import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../model";

type SelectedCategory = {
  value: Category[];
};

const initialState: SelectedCategory = {
  value: [],
};

const selectCategory = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    chooseCategory: (state, action) => {
      state.value.push(action.payload);
      
    },
    reinitialiseCategory: (state) => {
      state.value = [];
    },
  },
});

export const { chooseCategory, reinitialiseCategory } = selectCategory.actions;
export default selectCategory.reducer;
