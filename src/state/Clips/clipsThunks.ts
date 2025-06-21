import { ClipStatus } from "./clipsSlice";
import { Clip } from "./clipsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkExtraArgument } from "../store";
import { AxiosError } from "axios";

interface ClipSubmission {
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

export const getClipsByCreatorId = createAsyncThunk<
  Clip[],
  void,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clips/getByCreatorId", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<ClipSubmission[]>>(
      "/clips/get-by-creatorId"
    );
    if (response.data.data.length === 0) {
      return [];
    }
    return response.data.data as Clip[];
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return rejectWithValue(axiosError.response.data.message);
    }
    if (axiosError.response?.status === 404) {
      return [];
    }
    return rejectWithValue("Failed to fetch clips for creator");
  }
});

export const getClipsByClipperId = createAsyncThunk<
  Clip[],
  void,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clips/getByClipperId", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<ClipSubmission[]>>(
      "/clips/get-by-clipperId"
    );
    if (response.data.data.length === 0) {
      return [];
    }
    return response.data.data as Clip[];
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return rejectWithValue(axiosError.response.data.message);
    }
    if (axiosError.response?.status === 404) {
      return [];
    }
    return rejectWithValue("Failed to fetch clips for clipper");
  }
});

export const getClipById = createAsyncThunk<
  Clip,
  string,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clips/getById", async (clipId, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<ClipSubmission>>(
      `/clips/${clipId}`
    );
    return response.data.data as Clip;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return rejectWithValue(axiosError.response.data.message);
    }
    return rejectWithValue("Failed to fetch clip by ID");
  }
});

export interface SubmitClipPayload {
  videoFile: File;
  thumbnailFile: File;
  clipperId: string;
  creatorId: string;
  title: string;
  description: string;
}

export const submitClip = createAsyncThunk<
  ClipSubmission,
  SubmitClipPayload,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clips/submit", async (payload, { rejectWithValue, extra }) => {
  const { api } = extra;
  const formData = new FormData();
  formData.append("videoFile", payload.videoFile);
  formData.append("thumbnailFile", payload.thumbnailFile);
  formData.append("clipperId", payload.clipperId);
  formData.append("description", payload.description);
  formData.append("creatorId", payload.creatorId);
  formData.append("title", payload.title);

  try {
    const response = await api.post<ApiResponse<ClipSubmission>>(
      "/clips/submit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    console.log("failed to submit clip", axiosError.response?.data?.message);
    if (axiosError.response?.data?.message) {
      return rejectWithValue(axiosError.response.data.message);
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
  { rejectValue: string; extra: ThunkExtraArgument }
>("clips/updateStatus", async (payload, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.patch<ApiResponse<ClipSubmission>>(
      "/clips/status",
      payload
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return rejectWithValue(axiosError.response.data.message);
    }
    return rejectWithValue("Failed to update clip status");
  }
});
