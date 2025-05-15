import { createAsyncThunk } from "@reduxjs/toolkit";
import { Clipper, Creator } from "../../../model";
import api from "../../services/api"; // Assuming you have an api utility at src/utils/api.ts

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
  { rejectValue: string } // Types for ThunkAPI
>("profiles/getCreatorProfileById", async (creatorId, thunkAPI) => {
  try {
    const response = await api.get<CreatorProfileApiResponse>(
      `/auth/${creatorId}`
    );
    return response.data.data; // Assuming the profile is nested under response.data.data
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch creator profile"
    );
  }
});

export const getClipperProfileById = createAsyncThunk<
  Clipper, // Return type of the payload creator
  string, // First argument to the payload creator (clipperId)
  { rejectValue: string } // Types for ThunkAPI
>("profiles/getClipperProfileById", async (clipperId, thunkAPI) => {
  try {
    const response = await api.get<ClipperProfileApiResponse>(
      `/clippers/${clipperId}`
    );
    return response.data.data; // Assuming the profile is nested under response.data.data
  } catch (error) {
    const apiError = error as ApiError;
    return thunkAPI.rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch clipper profile"
    );
  }
});
