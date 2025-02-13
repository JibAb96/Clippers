import { createSlice } from "@reduxjs/toolkit";
import { Category, Clipper } from "../../../model";
import clippers from "../../clippers";

const initialState: Clipper[] = clippers;

const displayClippers = createSlice({
  name: "clippers",
  initialState,
  reducers: {
    filterClippers: (state, action) => {
      if (action.payload.length > 0) {
        const tempClippers = action.payload.map((selectedCategory: Category) => {
          // Filter clippers by matching niche or platform with selected category
          const temp = state.filter(
            (clipper) =>
              clipper.niche === selectedCategory.name ||
              clipper.platform === selectedCategory.name
          );
          return temp; // Return the filtered list for this category
        });

        // Return the filtered clippers by flattening the array of arrays
        return tempClippers.flat();
      } else {
        // If no filters are selected, return the full list of clippers
        return [...initialState];
      }
    },
    sortByPrice: (state, action) => {
      state.sort((a, b) =>
        action.payload ? a.price - b.price : b.price - a.price
      );
    },
  },
});

export const { filterClippers, sortByPrice } = displayClippers.actions;
export default displayClippers.reducer;
