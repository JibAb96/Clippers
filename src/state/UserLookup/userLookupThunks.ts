import { createAsyncThunk } from "@reduxjs/toolkit";
import { Clipper, Creator } from "../../model";
import { ThunkExtraArgument } from "../store";

// Define a more specific error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Adjust the response type if your API returns a different structure
interface CreatorProfileApiResponse {
  data: Creator;
}

interface ClipperProfileApiResponse {
  data: Clipper;
}

export const getCreatorProfileById = createAsyncThunk<
  Creator, // Return type of the payload creator
  string, // First argument to the payload creator (creatorId)
  { rejectValue: string; extra: ThunkExtraArgument } // Types for ThunkAPI
>(
  "profiles/getCreatorProfileById",
  async (creatorId, { rejectWithValue, extra }) => {
    const { api } = extra;
    const token = localStorage.getItem("token");
    try {
      const response = await api.get<CreatorProfileApiResponse>(
        `auth/creator/${creatorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; // Assuming the profile is nested under response.data.data
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to fetch creator profile"
      );
      
    }
  }
);

export const getClipperProfileById = createAsyncThunk<
  Clipper, // Return type of the payload creator
  string, // First argument to the payload creator (clipperId)
  { rejectValue: string; extra: ThunkExtraArgument } // Types for ThunkAPI
>(
  "profiles/getClipperProfileById",
  async (clipperId, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.get<ClipperProfileApiResponse>(
        `/clippers/${clipperId}`
      );
      return response.data.data; // Assuming the profile is nested under response.data.data
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to fetch clipper profile"
      );
    }
  }
);
