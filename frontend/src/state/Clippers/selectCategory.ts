import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../model";


const initialState: Category[] = []

const selectCategory = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    chooseCategory: (state, action) => {
      state.push(action.payload);
      
    },
    reinitialiseCategory: (state) => [], 
  },
});

export const { chooseCategory, reinitialiseCategory } = selectCategory.actions;
export default selectCategory.reducer;
