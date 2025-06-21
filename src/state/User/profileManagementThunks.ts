import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Creator,
  Clipper,
  IUpdateCreator,
  IUpdateClipper,
  ApiResponse,
  PortfolioImage,
  ApiError,
} from "@/model";
import type { ThunkExtraArgument, RootState } from "../store"; // Import RootState as well for complete ThunkApiConfig

// New thunk to get Creator profile
export const getCreatorProfile = createAsyncThunk<
  Creator,
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/getCreatorProfile", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<Creator>>(
      "/auth/get-creator-profile"
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch creator profile"
    );
  }
});

// Updated thunk to get Clipper profile (no ID needed in path, identified by token)
export const getClipperProfile = createAsyncThunk<
  Clipper,
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState } // Corrected ThunkApiConfig
>("user/getClipperProfile", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<Clipper>>(
      "/auth/get-clipper-profile" // Updated endpoint
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch clipper profile"
    );
  }
});

// Thunk to update Creator profile
export const updateCreatorProfile = createAsyncThunk<
  Creator,
  { profileData: IUpdateCreator },
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/updateCreatorProfile",
  async ({ profileData }, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await api.patch<ApiResponse<Creator>>(
        "/auth/update-creator-profile",
        profileData,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to update creator profile"
      );
    }
  }
);

// Thunk to update Clipper profile
export const updateClipperProfile = createAsyncThunk<
  Clipper,
  { profileData: IUpdateClipper },
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/updateClipperProfile",
  async ({ profileData }, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await api.patch<ApiResponse<Clipper>>(
        "/auth/update-clipper-profile",
        profileData,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to update clipper profile"
      );
    }
  }
);

// Thunk to upload Creator profile image
export const uploadCreatorProfileImage = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/uploadCreatorProfileImage",
  async (formData, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.post<ApiResponse<string | null>>(
        "/auth/upload-creator-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.data === null) {
        throw new Error("Image upload failed to return a URL.");
      }
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to upload creator image"
      );
    }
  }
);

// Thunk to upload Clipper profile image
export const uploadClipperProfileImage = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/uploadClipperProfileImage",
  async (formData, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.post<ApiResponse<string | null>>(
        "/auth/upload-clipper-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.data === null) {
        throw new Error("Image upload failed to return a URL.");
      }
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to upload clipper image"
      );
    }
  }
);

// Thunk to delete Creator profile image
export const deleteCreatorProfileImage = createAsyncThunk<
  { success: boolean; message: string },
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/deleteCreatorProfileImage", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >("/auth/delete-creator-image");

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return rejectWithValue(
        response.data.message ||
          "Failed to delete creator profile image due to server error."
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to delete creator profile image. An unexpected error occurred."
    );
  }
});

// Thunk to delete Clipper profile image
export const deleteClipperProfileImage = createAsyncThunk<
  { success: boolean; message: string },
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/deleteClipperProfileImage", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >("clippers/delete-clipper-image");

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return rejectWithValue(
        response.data.message ||
          "Failed to delete clipper profile image due to server error."
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to delete clipper profile image. An unexpected error occurred."
    );
  }
});

// Thunk to delete the current user's account
export const deleteCurrentUserAccount = createAsyncThunk<
  { success: boolean; message: string },
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/deleteCurrentUserAccount", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >("/auth/delete-user");
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to delete user account"
    );
  }
});

// Thunk to update user password
export const changePassword = createAsyncThunk<
  { success: boolean; message: string },
  { newPassword: string },
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/changePassword", async (passwordData, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.patch<
      ApiResponse<{ success: boolean; message: string }>
    >("/auth/change-password", passwordData);

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return rejectWithValue(
        response.data.message ||
          "Failed to update password due to server error."
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to update password. An unexpected error occurred."
    );
  }
});

// Thunk to upload Clipper portfolio images (max 4)
export const uploadPortfolioImages = createAsyncThunk<
  PortfolioImage[],
  FormData,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/uploadPortfolioImages",
  async (formData, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await api.post<ApiResponse<PortfolioImage[]>>(
        "/clippers/upload-portfolio-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header
          },
        }
      );
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(
          response.data.message || "Portfolio image upload failed"
        );
      }
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to upload portfolio images"
      );
    }
  }
);

// Thunk to delete a Clipper portfolio image by its ID
export const deletePortfolioImageById = createAsyncThunk<
  { imageId: string; success: boolean; message: string },
  string,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>(
  "user/deletePortfolioImageById",
  async (imageId, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await api.delete<ApiResponse<void>>(
        `/clippers/delete-portfolio-image/${imageId}`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header
          },
        }
      );
      if (response.data.status === "success") {
        return {
          imageId,
          success: true,
          message: response.data.message || "Image deleted successfully",
        };
      } else {
        throw new Error(
          response.data.message ||
            "Failed to delete portfolio image from server"
        );
      }
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to delete portfolio image"
      );
    }
  }
);

// New thunk to get Creator profile
export const getClipperGuidelines = createAsyncThunk<
  Creator,
  void,
  { rejectValue: string; extra: ThunkExtraArgument; state: RootState }
>("user/getCreatorProfile", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<Creator>>(
      "/auth/get-creator-profile"
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch creator profile"
    );
  }
});
