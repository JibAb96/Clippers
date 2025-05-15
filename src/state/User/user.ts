"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clipper, PortfolioImage, Creator } from "../../model";
import { loginCreator, loginClipper } from "./userThunks";
import { getClipperPortfolioImages } from "@/state/Clippers/clipperThunks";
import {
  getCurrentUserProfile,
  updateCreatorProfile,
  updateClipperProfile,
  uploadCreatorProfileImage,
  uploadClipperProfileImage,
  deleteCreatorProfileImage,
  deleteClipperProfileImage,
  deleteCurrentUserAccount,
  uploadPortfolioImages,
  deletePortfolioImageById,
} from "./profileManagementThunks";

// Define a generic UserProfile interface - adjust fields as per your API response
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: "creator" | "clipper"; // Assuming the user object from API contains a role
  // Add other common fields or extend for specific roles
}

interface UserState {
  user: Clipper | Creator | null;
  token: string | null;
  userType: "creator" | "clipper" | null;
  loading: boolean;
  error: string | null;
  portfolioImages?: PortfolioImage[] | null;
  portfolioLoading?: boolean;
  portfolioError?: string | null;
  profileUpdateLoading: boolean;
  profileUpdateError: string | null;
  imageUploadLoading: boolean;
  imageUploadError: string | null;
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
  profileUpdateLoading: false,
  profileUpdateError: null,
  imageUploadLoading: false,
  imageUploadError: null,
};

interface SetUserPayload {
  user: Clipper | Creator | null;
  token: string | null;
  refreshToken?: string | null;
  role: "creator" | "clipper" | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.role;
      state.loading = false;
      state.error = null;
      state.profileUpdateLoading = false;
      state.profileUpdateError = null;
      state.imageUploadLoading = false;
      state.imageUploadError = null;
    },
    updateUser: (state, action: PayloadAction<Partial<Clipper | Creator>>) => {
      if (
        state.user &&
        typeof state.user === "object" &&
        !Array.isArray(state.user)
      ) {
        if (state.userType === "creator") {
          state.user = {
            ...(state.user as Creator),
            ...action.payload,
          } as Creator;
        } else if (state.userType === "clipper") {
          state.user = {
            ...(state.user as Clipper),
            ...action.payload,
          } as Clipper;
        }
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
      state.profileUpdateLoading = false;
      state.profileUpdateError = null;
      state.imageUploadLoading = false;
      state.imageUploadError = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
    setUserType: (state, action: PayloadAction<"creator" | "clipper">) => {
      state.userType = action.payload;
    },
    clearProfileUpdateStatus: (state) => {
      state.profileUpdateLoading = false;
      state.profileUpdateError = null;
    },
    clearImageUploadStatus: (state) => {
      state.imageUploadLoading = false;
      state.imageUploadError = null;
    },
    clearPortfolioStatus: (state) => {
      state.portfolioLoading = false;
      state.portfolioError = null;
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
        state.user = action.payload.data.user as Creator;
        state.token = action.payload.data.token;
        state.userType = action.payload.data.role;
        state.error = null;
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
        state.user = action.payload.data.user as Clipper;
        state.token = action.payload.data.token;
        state.userType = action.payload.data.role;
        state.error = null;
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
          "id" in state.user &&
          state.user.id === action.meta.arg
        ) {
          state.portfolioLoading = false;
          state.portfolioImages = action.payload.data;
          state.portfolioError = null;
        }
      })
      .addCase(getClipperPortfolioImages.rejected, (state, action) => {
        if (
          state.userType === "clipper" &&
          state.user &&
          "id" in state.user &&
          state.user.id === action.meta.arg
        ) {
          state.portfolioLoading = false;
          state.portfolioError = action.payload as string;
        }
      })
      // Handle getCurrentUserProfile
      .addCase(getCurrentUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if ("followerCount" in action.payload) {
          state.userType = "clipper";
        } else {
          state.userType = "creator";
        }
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("userType", state.userType);
      })
      .addCase(getCurrentUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateCreatorProfile
      .addCase(updateCreatorProfile.pending, (state) => {
        state.profileUpdateLoading = true;
        state.profileUpdateError = null;
      })
      .addCase(updateCreatorProfile.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        if (state.user && state.userType === "creator") {
          state.user = { ...state.user, ...action.payload } as Creator;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updateCreatorProfile.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateError = action.payload as string;
      })
      // Handle updateClipperProfile
      .addCase(updateClipperProfile.pending, (state) => {
        state.profileUpdateLoading = true;
        state.profileUpdateError = null;
      })
      .addCase(updateClipperProfile.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        if (state.user && state.userType === "clipper") {
          state.user = { ...state.user, ...action.payload } as Clipper;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updateClipperProfile.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateError = action.payload as string;
      })
      // Handle uploadCreatorProfileImage
      .addCase(uploadCreatorProfileImage.pending, (state) => {
        state.imageUploadLoading = true;
        state.imageUploadError = null;
      })
      .addCase(
        uploadCreatorProfileImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.imageUploadLoading = false;
          if (
            state.user &&
            state.userType === "creator" &&
            typeof state.user === "object" &&
            "brandProfilePicture" in state.user
          ) {
            state.user.brandProfilePicture = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      .addCase(uploadCreatorProfileImage.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadError =
          (action.payload as string) ||
          action.error.message ||
          "Creator image upload failed";
      })
      // Handle uploadClipperProfileImage
      .addCase(uploadClipperProfileImage.pending, (state) => {
        state.imageUploadLoading = true;
        state.imageUploadError = null;
      })
      .addCase(
        uploadClipperProfileImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.imageUploadLoading = false;
          if (
            state.user &&
            state.userType === "clipper" &&
            typeof state.user === "object" &&
            "brandProfilePicture" in state.user
          ) {
            state.user.brandProfilePicture = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      .addCase(uploadClipperProfileImage.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadError =
          (action.payload as string) ||
          action.error.message ||
          "Clipper image upload failed";
      })
      // Handle deleteCreatorProfileImage
      .addCase(deleteCreatorProfileImage.pending, (state) => {
        state.imageUploadLoading = true;
        state.imageUploadError = null;
      })
      .addCase(
        deleteCreatorProfileImage.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; message: string }>
        ) => {
          state.imageUploadLoading = false;
          if (
            action.payload.success &&
            state.user &&
            state.userType === "creator" &&
            typeof state.user === "object" &&
            "brandProfilePicture" in state.user
          ) {
            state.user.brandProfilePicture = null;
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      .addCase(deleteCreatorProfileImage.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadError = action.payload as string;
      })
      // Handle deleteClipperProfileImage
      .addCase(deleteClipperProfileImage.pending, (state) => {
        state.imageUploadLoading = true;
        state.imageUploadError = null;
      })
      .addCase(
        deleteClipperProfileImage.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; message: string }>
        ) => {
          state.imageUploadLoading = false;
          if (
            action.payload.success &&
            state.user &&
            state.userType === "clipper" &&
            typeof state.user === "object" &&
            "brandProfilePicture" in state.user
          ) {
            state.user.brandProfilePicture = null;
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      .addCase(deleteClipperProfileImage.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadError = action.payload as string;
      })
      // Handle deleteCurrentUserAccount
      .addCase(deleteCurrentUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCurrentUserAccount.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; message: string }>
        ) => {
          if (action.payload.success) {
            state.user = null;
            state.token = null;
            state.userType = null;
            state.loading = false;
            state.error = null;
            state.portfolioImages = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userType");
          } else {
            state.loading = false;
            state.error = action.payload.message || "Failed to delete account.";
          }
        }
      )
      .addCase(deleteCurrentUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // --- Portfolio Image Management for Clippers ---
      .addCase(uploadPortfolioImages.pending, (state) => {
        if (state.userType === "clipper") {
          state.portfolioLoading = true;
          state.portfolioError = null;
        }
      })
      .addCase(
        uploadPortfolioImages.fulfilled,
        (state, action: PayloadAction<PortfolioImage[]>) => {
          if (state.userType === "clipper") {
            state.portfolioLoading = false;
            if (!state.portfolioImages) {
              state.portfolioImages = [];
            }
            state.portfolioImages = [
              ...state.portfolioImages,
              ...action.payload,
            ];
          }
        }
      )
      .addCase(uploadPortfolioImages.rejected, (state, action) => {
        if (state.userType === "clipper") {
          state.portfolioLoading = false;
          state.portfolioError = action.payload as string;
        }
      })
      .addCase(deletePortfolioImageById.pending, (state) => {
        if (state.userType === "clipper") {
          state.portfolioLoading = true;
          state.portfolioError = null;
        }
      })
      .addCase(
        deletePortfolioImageById.fulfilled,
        (
          state,
          action: PayloadAction<{ imageId: string; success: boolean }>
        ) => {
          if (
            state.userType === "clipper" &&
            action.payload.success &&
            state.portfolioImages
          ) {
            state.portfolioLoading = false;
            state.portfolioImages = state.portfolioImages.filter(
              (image: PortfolioImage) => image.id !== action.payload.imageId
            );
          } else if (state.userType === "clipper") {
            state.portfolioLoading = false;
          }
        }
      )
      .addCase(deletePortfolioImageById.rejected, (state, action) => {
        if (state.userType === "clipper") {
          state.portfolioLoading = false;
          state.portfolioError = action.payload as string;
        }
      });
  },
});

export const {
  setUser,
  updateUser,
  logout,
  setUserType,
  clearProfileUpdateStatus,
  clearImageUploadStatus,
  clearPortfolioStatus,
} = userSlice.actions;

export default userSlice.reducer;
