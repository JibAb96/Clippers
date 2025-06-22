import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clipper, Creator } from "../../model";
import {
  getCreatorProfileById,
  getClipperProfileById,
} from "./userLookupThunks";

export interface ProfileState<T> {
  profile: { [id: string]: T };
  loading: boolean;
  error: string | null;
}

const initialCreatorProfileState: ProfileState<Creator> = {
  profile: {},
  loading: false,
  error: null,
};

const initialClipperProfileState: ProfileState<Clipper> = {
  profile: {},
  loading: false,
  error: null,
};

const creatorProfileSlice = createSlice({
  name: "creatorProfile",
  initialState: initialCreatorProfileState,
  reducers: {
    clearCreatorProfile: (state) => {
      state.profile = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCreatorProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCreatorProfileById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.meta.arg) {
          state.profile[action.meta.arg] = action.payload;
        }
      })
      .addCase(getCreatorProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const clipperProfileSlice = createSlice({
  name: "clipperProfile",
  initialState: initialClipperProfileState,
  reducers: {
    clearClipperProfile: (state) => {
      state.profile = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClipperProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClipperProfileById.fulfilled,
        (state, action: PayloadAction<Clipper, string, { arg: string }>) => {
          state.loading = false;
          if (action.payload && action.meta.arg) {
            state.profile[action.meta.arg] = action.payload;
          }
        }
      )
      .addCase(getClipperProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCreatorProfile } = creatorProfileSlice.actions;
export const { clearClipperProfile } = clipperProfileSlice.actions;

export const creatorProfileReducer = creatorProfileSlice.reducer;
export const clipperProfileReducer = clipperProfileSlice.reducer;

// Selectors for use in components
import type { RootState } from "../store"; // Adjust the path as needed

export const selectCreatorProfileById = (state: RootState, id: string) =>
  state.creatorProfile.profile[id];
export const selectClipperProfileById = (state: RootState, id: string) =>
  state.clipperProfile.profile[id];
