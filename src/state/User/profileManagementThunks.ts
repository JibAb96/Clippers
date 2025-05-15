import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Creator,
  Clipper,
  IUpdateCreator,
  IUpdateClipper,
  IDeleteImage,
  ApiResponse,
  PortfolioImage,
  ApiError,
} from "@/model";
import api from "../../services/api";

// Thunk to get the current user's full profile details
export const getCurrentUserProfile = createAsyncThunk<
  Creator | Clipper, // Returns either a Creator or Clipper profile
  void, // No arguments needed, user inferred from token
  { rejectValue: string }
>("user/getCurrentUserProfile", async (_, thunkAPI) => {
  try {
    // Assuming the backend determines user type and returns the correct profile structure
    const response = await api.get<ApiResponse<Creator | Clipper>>(
      "/auth/get-user-profile" // Added /auth prefix
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch user profile"
    );
  }
});

// Thunk to update Creator profile
export const updateCreatorProfile = createAsyncThunk<
  Creator,
  { profileData: IUpdateCreator },
  { rejectValue: string }
>("user/updateCreatorProfile", async ({ profileData }, thunkAPI) => {
  try {
    const response = await api.patch<ApiResponse<Creator>>(
      "/auth/update-creator-profile",
      profileData
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to update creator profile"
    );
  }
});

// Thunk to update Clipper profile
export const updateClipperProfile = createAsyncThunk<
  Clipper,
  { profileData: IUpdateClipper },
  { rejectValue: string }
>("user/updateClipperProfile", async ({ profileData }, thunkAPI) => {
  try {
    const response = await api.patch<ApiResponse<Clipper>>(
      "/auth/update-clipper-profile",
      profileData
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to update clipper profile"
    );
  }
});

// Thunk to upload Creator profile image
export const uploadCreatorProfileImage = createAsyncThunk<
  string, // Returns the new image URL
  FormData, // Argument is FormData containing the image
  { rejectValue: string }
>("user/uploadCreatorProfileImage", async (formData, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to upload creator image"
    );
  }
});

// Thunk to upload Clipper profile image
export const uploadClipperProfileImage = createAsyncThunk<
  string, // Returns the new image URL
  FormData, // Argument is FormData containing the image
  { rejectValue: string }
>("user/uploadClipperProfileImage", async (formData, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to upload clipper image"
    );
  }
});

// Thunk to delete Creator profile image
export const deleteCreatorProfileImage = createAsyncThunk<
  { success: boolean; message: string },
  IDeleteImage,
  { rejectValue: string } // No longer needs RootState
>("user/deleteCreatorProfileImage", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue(
        "Authentication token not found. Please log in."
      );
    }

    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >("/auth/delete-creator-image", {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(
        response.data.message ||
          "Failed to delete creator profile image due to server error."
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    if (
      apiError.response &&
      apiError.response.data &&
      apiError.response.data.message
    ) {
      return thunkAPI.rejectWithValue(apiError.response.data.message);
    }
    if (apiError.message) {
      return thunkAPI.rejectWithValue(apiError.message);
    }
    return thunkAPI.rejectWithValue(
      "Failed to delete creator profile image. An unexpected error occurred."
    );
  }
});

// Thunk to delete Clipper profile image
export const deleteClipperProfileImage = createAsyncThunk<
  { success: boolean; message: string },
  IDeleteImage,
  { rejectValue: string } // No longer needs RootState
>("user/deleteClipperProfileImage", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue(
        "Authentication token not found. Please log in."
      );
    }

    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >("clippers/delete-clipper-image", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(
        response.data.message ||
          "Failed to delete clipper profile image due to server error."
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    if (
      apiError.response &&
      apiError.response.data &&
      apiError.response.data.message
    ) {
      return thunkAPI.rejectWithValue(apiError.response.data.message);
    }
    if (apiError.message) {
      return thunkAPI.rejectWithValue(apiError.message);
    }
    return thunkAPI.rejectWithValue(
      "Failed to delete clipper profile image. An unexpected error occurred."
    );
  }
});

// Thunk to delete the current user's account
// Updated to remove userId argument and use a fixed path for deleting current user.
export const deleteCurrentUserAccount = createAsyncThunk<
  { success: boolean; message: string },
  void, // No argument needed
  { rejectValue: string }
>("user/deleteCurrentUserAccount", async (_, thunkAPI) => {
  try {
    const response = await api.delete<
      ApiResponse<{ success: boolean; message: string }>
    >(
      "/auth/delete-user" // Corrected path with /auth prefix, specific to deleting current user
    );
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to delete user account"
    );
  }
});

// Thunk to upload Clipper portfolio images (max 4)
export const uploadPortfolioImages = createAsyncThunk<
  PortfolioImage[], // Returns an array of uploaded portfolio images
  FormData, // Argument is FormData containing the image(s)
  { rejectValue: string }
>("user/uploadPortfolioImages", async (formData, thunkAPI) => {
  try {
    const response = await api.post<ApiResponse<PortfolioImage[]>>(
      "/clippers/upload-portfolio-images", // Endpoint with /clippers prefix
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Assuming response.data.data is PortfolioImage[]
    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response.data.message || "Portfolio image upload failed");
    }
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to upload portfolio images"
    );
  }
});

// Thunk to delete a Clipper portfolio image by its ID
export const deletePortfolioImageById = createAsyncThunk<
  { imageId: string; success: boolean; message: string }, // Return imageId on success for easy state update
  string, // Argument is the imageId to delete
  { rejectValue: string }
>("user/deletePortfolioImageById", async (imageId, thunkAPI) => {
  try {
    const response = await api.delete<ApiResponse<void>>(
      `/clippers/delete-portfolio-image/${imageId}` // Endpoint with /clippers prefix and imageId
    );
    // If API call is successful (doesn't throw), assume deletion worked.
    // The backend returns ApiResponse<void>, so data might be empty or undefined.
    if (response.data.status === "success") {
      return {
        imageId,
        success: true,
        message: response.data.message || "Image deleted successfully",
      };
    } else {
      throw new Error(
        response.data.message || "Failed to delete portfolio image from server"
      );
    }
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to delete portfolio image"
    );
  }
});
