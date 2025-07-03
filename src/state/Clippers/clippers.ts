import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Clipper } from "../../model";
import { fetchClippers, searchClippers } from "./clipperThunks";

interface ClippersState {
  items: Clipper[];
  originalItems: Clipper[];
  loading: boolean;
  error: string | null;
}

const initialState: ClippersState = {
  items: [],
  originalItems: [],
  loading: false,
  error: null,
};

const clippersSlice = createSlice({
  name: "clippers",
  initialState,
  reducers: {
    filterClippers: (state, action: PayloadAction<Category[]>) => {
      if (action.payload.length > 0) {
        const selectedCategories = action.payload;
        state.items = state.originalItems.filter((clipper) =>
          selectedCategories.some(
            (selectedCategory) =>
              clipper.niche === selectedCategory.name ||
              clipper.platform === selectedCategory.name
          )
        );
      } else {
        state.items = state.originalItems;
      }
    },
    sortByPrice: (state, action: PayloadAction<boolean>) => {
      const sortedItems = [...state.items].sort((a, b) =>
        action.payload
          ? a.pricePerPost - b.pricePerPost
          : b.pricePerPost - a.pricePerPost
      );
      state.items = sortedItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClippers.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(fetchClippers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.originalItems = action.payload;
      })
      .addCase(fetchClippers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchClippers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchClippers.fulfilled,
        (state, action: PayloadAction<Clipper[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.originalItems = action.payload;
        }
      )
      .addCase(searchClippers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filterClippers, sortByPrice } = clippersSlice.actions;
export default clippersSlice.reducer;
