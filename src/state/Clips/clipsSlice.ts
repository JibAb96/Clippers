"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getClipById,
  getClipsByClipperId,
  submitClip,
  updateClipStatus,
} from "./clipsThunks";
import { getClipsByCreatorId } from "./clipsThunks";

export interface Clip {
  id: string;
  clipperId: string;
  creatorId: string; // Added based on thunks needing it
  description: string;
  clipUrl: string; // Assuming these are part of the ClipSubmission
  thumbnailUrl: string; // Assuming these are part of the ClipSubmission
  status: ClipStatus;
  // Add any other relevant fields from ClipSubmission
  title: string;
  createdAt: string;
  updatedAt: string;
}

export enum ClipStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

interface ClipsState {
  clips: Clip[];
  filteredClips: Clip[];
  selectedClip: Clip | null;
  loading: boolean;
  error: string | null;
  submitLoading: boolean;
  submitError: string | null;
  statusUpdateLoading: boolean;
  statusUpdateError: string | null;
}

const initialClipsState: ClipsState = {
  clips: [],
  filteredClips: [],
  selectedClip: null,
  loading: false,
  error: null,
  submitLoading: false,
  submitError: null,
  statusUpdateLoading: false,
  statusUpdateError: null,
};

// Thunks
// Helper to get token from localStorage

const clipsSlice = createSlice({
  name: "clips",
  initialState: initialClipsState,
  reducers: {
    setSelectedClip: (state, action: PayloadAction<Clip | null>) => {
      state.selectedClip = action.payload;
    },
    clearClips: (state) => {
      state.clips = [];
      state.selectedClip = null;
      state.error = null;
      state.loading = false;
    },
    filterClips: (
      state,
      action: PayloadAction<{ clips: Clip[]; status: ClipStatus | null }>
    ) => {
      const { status } = action.payload; // The 'clips' property in payload is not used here as we filter state.clips
      if (status === null) {
        state.filteredClips = state.clips;
      } else {
        state.filteredClips = state.clips.filter(
          (clip) => clip.status === status
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // getClipsByCreatorId
      .addCase(getClipsByCreatorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClipsByCreatorId.fulfilled, (state, action) => {
        state.loading = false;
        state.clips = action.payload;
      })
      .addCase(getClipsByCreatorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // getClipsByClipperId
      .addCase(getClipsByClipperId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClipsByClipperId.fulfilled, (state, action) => {
        state.loading = false;
        state.clips = action.payload;
      })
      .addCase(getClipsByClipperId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // getClipById
      .addCase(getClipById.pending, (state) => {
        state.loading = true; // Or a specific loading state for selectedClip
        state.error = null;
      })
      .addCase(getClipById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClip = action.payload;
      })
      .addCase(getClipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Or a specific error state
      })
      // submitClip
      .addCase(submitClip.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;

      })
      .addCase(submitClip.fulfilled, (state, action) => {
        state.submitLoading = false;
        // Optionally add the new clip to the state.clips array
        // Or refetch clips list depending on UX
        state.clips.unshift(action.payload as Clip); // Add to the beginning
    
      })
      .addCase(submitClip.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload as string;

      })
      // updateClipStatus
      .addCase(updateClipStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.statusUpdateError = null;
      })
      .addCase(updateClipStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        const updatedClip = action.payload as Clip;
        // Update the clip in the clips array
        const index = state.clips.findIndex((c) => c.id === updatedClip.id);
        if (index !== -1) {
          state.clips[index] = updatedClip;
        }
        // Update selectedClip if it's the one being modified
        if (state.selectedClip && state.selectedClip.id === updatedClip.id) {
          state.selectedClip = updatedClip;
        }
      })
      .addCase(updateClipStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.statusUpdateError = action.payload as string;
      });
  },
});

export const { setSelectedClip, clearClips, filterClips } = clipsSlice.actions;

export default clipsSlice.reducer;
