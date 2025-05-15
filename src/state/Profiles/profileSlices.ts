import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clipper, Creator } from "../../model";
import { getCreatorProfileById, getClipperProfileById } from "./profileThunks";

export interface ProfileState<T> {
  profile: T | null;
  loading: boolean;
  error: string | null;
}

const initialCreatorProfileState: ProfileState<Creator> = {
  profile: null,
  loading: false,
  error: null,
};

const initialClipperProfileState: ProfileState<Clipper> = {
  profile: null,
  loading: false,
  error: null,
};

const creatorProfileSlice = createSlice({
  name: "creatorProfile",
  initialState: initialCreatorProfileState,
  reducers: {
    clearCreatorProfile: (state) => {
      state.profile = null;
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
      .addCase(
        getCreatorProfileById.fulfilled,
        (state, action: PayloadAction<Creator>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
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
      state.profile = null;
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
        (state, action: PayloadAction<Clipper>) => {
          state.loading = false;
          state.profile = action.payload;
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
