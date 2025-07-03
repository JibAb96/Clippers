import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Adjust path as needed

// Define a more specific error type (can be shared if not already in another thunk file)
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Define the expected success response structure from the API
interface ImageUploadApiResponse {
  status: string;
  data: string; // Assuming this holds the image URL or relevant success data
  message: string;
}

interface FileUploadPayload {
  token: string;
  imageFile: File;
}

// Thunk for uploading a creator's profile image
export const uploadCreatorImage = createAsyncThunk<
  ImageUploadApiResponse,
  FileUploadPayload
>(
  "user/uploadCreatorImage",
  async (payload: FileUploadPayload, { rejectWithValue }) => {
    if (payload.imageFile.size > 2 * 1024 * 1024) {
      return rejectWithValue("File is too large. Maximum size is 2MB.");
    }

    const formData = new FormData();
    formData.append("image", payload.imageFile);

    try {
      const response = await api.post<ImageUploadApiResponse>(
        `/auth/upload-creator-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return response.data;
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

// Thunk for uploading a clipper's profile image
export const uploadClipperImage = createAsyncThunk<
  ImageUploadApiResponse,
  FileUploadPayload
>(
  "user/uploadClipperImage",
  async (payload: FileUploadPayload, { rejectWithValue }) => {
    if (payload.imageFile.size > 2 * 1024 * 1024) {
      return rejectWithValue("File is too large. Maximum size is 2MB.");
    }

    const formData = new FormData();
    formData.append("image", payload.imageFile);
   
    try {
      const response = await api.post<ImageUploadApiResponse>(
        `/auth/upload-clipper-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return response.data;
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
