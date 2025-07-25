import { createSlice } from "@reduxjs/toolkit";
import { Clipper, Guidelines, PortfolioImage } from "../../model";
import {
  getClipperById,
  getClipperPortfolioImages,
  getClipperGuidelines,
} from "./clipperThunks";

interface SelectedClipperState {
  clipper: Clipper | null;
  portfolioImages: PortfolioImage[];
  guidelines: Guidelines[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  portfolioLoading: "idle" | "pending" | "succeeded" | "failed";
  portfolioError: string | null;
  guidelinesLoading: "idle" | "pending" | "succeeded" | "failed";
  guidelinesError: string | null;
}

const initialState: SelectedClipperState = {
  clipper: null,
  portfolioImages: [],
  guidelines: [],
  loading: "idle",
  error: null,
  portfolioLoading: "idle",
  portfolioError: null,
  guidelinesLoading: "idle",
  guidelinesError: null,
};

const selectedClipperSlice = createSlice({
  name: "selectedClipper",
  initialState,
  reducers: {
    clearSelectedClipper: (state) => {
      state.clipper = null;
      state.portfolioImages = [];
      state.guidelines = [];
      state.error = null;
      state.portfolioError = null;
      state.guidelinesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get clipper by ID
      .addCase(getClipperById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getClipperById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.clipper = action.payload;
      })
      .addCase(getClipperById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      // Get clipper portfolio images by id
      .addCase(getClipperPortfolioImages.pending, (state) => {
        state.portfolioLoading = "pending";
        state.portfolioError = null;
      })
      .addCase(getClipperPortfolioImages.fulfilled, (state, action) => {
        state.portfolioLoading = "succeeded";
        state.portfolioImages = action.payload;
      })
      .addCase(getClipperPortfolioImages.rejected, (state, action) => {
        state.portfolioLoading = "failed";
        state.portfolioError = action.payload as string;
      })
      // Get clipper guidelines by id
      .addCase(getClipperGuidelines.pending, (state) => {
        state.guidelinesLoading = "pending";
        state.guidelinesError = null;
      }).addCase(getClipperGuidelines.fulfilled, (state, action) => {
        state.guidelinesLoading = "succeeded";
        state.guidelines = action.payload;
      }).addCase(getClipperGuidelines.rejected, (state, action) => {
        state.guidelinesLoading = "failed";
        state.guidelinesError = action.payload as string;
      });
  },
});

export const { clearSelectedClipper } = selectedClipperSlice.actions;
export default selectedClipperSlice.reducer;
