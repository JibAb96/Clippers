"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clipper, PortfolioImage } from "../../../model";
import { loginCreator, loginClipper } from "./userThunks";
import { getClipperPortfolioImages } from "@/state/Clippers/clipperThunks";

// Define a generic UserProfile interface - adjust fields as per your API response
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: "creator" | "clipper"; // Assuming the user object from API contains a role
  // Add other common fields or extend for specific roles
}

interface UserState {
  user: Clipper | Record<string, string> | null;
  token: string | null;
  userType: "creator" | "clipper" | null;
  loading: boolean;
  error: string | null;
  portfolioImages?: PortfolioImage[] | null;
  portfolioLoading?: boolean;
  portfolioError?: string | null;
  // profile: Clipper | null; // This will be replaced by the more generic 'user'
}

const initialUserState: UserState = {
  user: null,
  token: null,
  userType: null,
  loading: false,
  error: null,
  portfolioImages: null,
  portfolioLoading: false,
  portfolioError: null,
  // profile: null, // Remove if 'user' replaces 'profile'
};

interface Payload {
  user: Clipper | Record<string, string> | null;
  token: string | null;
  refreshToken: string | null;
  role: "creator" | "clipper" | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<Payload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.role;
      state.loading = false;
      state.error = null;
      state.portfolioImages = null;
      state.portfolioLoading = false;
      state.portfolioError = null;
    },
    updateUser: (state, action: PayloadAction<Partial<Payload>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload.user };
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.loading = false;
      state.error = null;
      state.portfolioImages = null;
      state.portfolioLoading = false;
      state.portfolioError = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
    setUserType: (state, action: PayloadAction<"creator" | "clipper">) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginCreator
      .addCase(loginCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user; // Assuming payload is { user: UserProfile, token: string }
        state.token = action.payload.data.token;
        state.userType = action.payload.data.role;
        state.error = null;
        // Store in localStorage
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("userType", action.payload.data.role);
      })
      .addCase(loginCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.userType = null;
      })
      // Handle loginClipper
      .addCase(loginClipper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginClipper.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user; // Assuming payload is { user: UserProfile, token: string }
        state.token = action.payload.data.token;
        state.userType = action.payload.data.role;
        state.error = null;
        // Store in localStorage
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("userType", action.payload.data.role);
      })
      .addCase(loginClipper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.userType = null;
      })
      // Handle getClipperPortfolioImages
      .addCase(getClipperPortfolioImages.pending, (state) => {
        if (state.userType === "clipper") {
          state.portfolioLoading = true;
          state.portfolioError = null;
        }
      })
      .addCase(getClipperPortfolioImages.fulfilled, (state, action) => {
        if (
          state.userType === "clipper" &&
          state.user &&
          state.user.id === action.meta.arg
        ) {
          console.log("action.payload", action.payload);
          state.portfolioLoading = false;
          state.portfolioImages = action.payload.data;
          state.portfolioError = null;
        }
      })
      .addCase(getClipperPortfolioImages.rejected, (state, action) => {
        if (
          state.userType === "clipper" &&
          state.user &&
          state.user.id === action.meta.arg
        ) {
          state.portfolioLoading = false;
          state.portfolioError = action.payload as string;
        }
      });
  },
});

export const { setUser, updateUser, logout, setUserType } = userSlice.actions;

// Selector example (if needed)
// export const selectUserType = (state: { user: UserState }) => state.user.userType;

export default userSlice.reducer;
