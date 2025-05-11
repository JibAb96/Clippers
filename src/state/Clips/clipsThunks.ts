import { ClipStatus } from "./clipsSlice";
import api from "@/services/api";
import { Clip } from "./clipsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 interface ClipSubmission {
  // This should match the structure returned by your API's ClipSubmission
  id: string;
  clipperId: string;
  creatorId: string;
  description: string;
  clipUrl: string;
  thumbnailUrl: string;
  status: ClipStatus;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message: string;
}
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getClipsByCreatorId = createAsyncThunk<
  Clip[], // Return type
  void, // Argument type (no argument needed as creatorId comes from token/user state)
  { rejectValue: string }
>("clips/getByCreatorId", async (_, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return rejectWithValue("No token found");
  }
  try {
    const response = await axios.get<ApiResponse<ClipSubmission[]>>(
      `${api}/clips/get-by-creatorId`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data.data.length === 0) {
      return []
    }
    return response.data.data as Clip[];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return []
    }
    return rejectWithValue("Failed to fetch clips for creator");
  }
});

export const getClipsByClipperId = createAsyncThunk<
  Clip[],
  void, // Argument type (no argument needed as clipperId comes from token/user state)
  { rejectValue: string }
>("clips/getByClipperId", async (_, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return rejectWithValue("No token found");
  }
  try {
    const response = await axios.get<ApiResponse<ClipSubmission[]>>(
      `${api}/clips/get-by-clipperId`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data.data.length === 0) {
      return []
    }
    return response.data.data as Clip[];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return []
    }
    return rejectWithValue("Failed to fetch clips for clipper");
  }
});

export const getClipById = createAsyncThunk<
  Clip,
  string, // Argument: clipId
  { rejectValue: string }
>("clips/getById", async (clipId, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return rejectWithValue("No token found");
  }
  try {
    const response = await axios.get<ApiResponse<ClipSubmission>>(
      `${api}/clips/${clipId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data as Clip;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch clip by ID");
  }
});

export interface SubmitClipPayload {
  clip: File;
  thumbnail: File;
  clipperId: string; // Or should this come from the logged-in user?
  description: string;
}

export const submitClip = createAsyncThunk<
  ClipSubmission,
  SubmitClipPayload,
  { rejectValue: string }
>("clips/submit", async (payload, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return rejectWithValue("No token found");
  }
  const formData = new FormData();
  formData.append("clip", payload.clip);
  formData.append("thumbnail", payload.thumbnail);
  formData.append("clipperId", payload.clipperId); // Ensure this is correct based on your API
  formData.append("description", payload.description);

  try {
    const response = await axios.post<ApiResponse<ClipSubmission>>(
      `${api}/clips/submit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to submit clip");
  }
});

export interface UpdateClipStatusPayload {
  clipId: string;
  status: ClipStatus;
}

export const updateClipStatus = createAsyncThunk<
  ClipSubmission,
  UpdateClipStatusPayload,
  { rejectValue: string }
>("clips/updateStatus", async (payload, { rejectWithValue }) => {
  const token = getToken();
  if (!token) {
    return rejectWithValue("No token found");
  }
  try {
    const response = await axios.patch<ApiResponse<ClipSubmission>>(
      `${api}/clips/status`,
      payload, // { clipId, status }
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to update clip status");
  }
});
