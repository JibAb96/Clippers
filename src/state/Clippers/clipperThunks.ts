import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkExtraArgument } from "../store";
import {
  Clipper,
  PortfolioImage,
  Guidelines,
  ApiError,
  ApiResponse,
} from "@/model";

// Fetch all clippers
export const fetchClippers = createAsyncThunk<
  Clipper[],
  void,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clippers/fetchClippers", async (_, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<Clipper[]>>("/clippers");
    return response.data.data;
  
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch clippers"
    );
  }
});

// Search clippers
export const searchClippers = createAsyncThunk<
  Clipper[],
  string,
  { rejectValue: string; extra: ThunkExtraArgument }
>(
  "clippers/searchClippers",
  async (searchQuery: string, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.get<ApiResponse<Clipper[]>>(
        `/clippers/search?q=${encodeURIComponent(searchQuery)}`
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to search clippers"
      );
    }
  }
);

// Get clipper by ID
export const getClipperById = createAsyncThunk<
  Clipper,
  string,
  { rejectValue: string; extra: ThunkExtraArgument }
>("clippers/getClipperById", async (id: string, { rejectWithValue, extra }) => {
  const { api } = extra;
  try {
    const response = await api.get<ApiResponse<Clipper>>(`/clippers/${id}`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message ||
        apiError.message ||
        "Failed to fetch clipper"
    );
  }
});

// Get clipper portfolio images by id
export const getClipperPortfolioImages = createAsyncThunk<
  PortfolioImage[],
  string,
  { rejectValue: string; extra: ThunkExtraArgument }
>(
  "clippers/getClipperPortfolioImages",
  async (id: string, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.get<ApiResponse<PortfolioImage[]>>(
        `/clippers/portfolio-images/${id}`
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to fetch clipper portfolio images"
      );
    }
  }
);

export const getClipperGuidelines = createAsyncThunk<
  Guidelines[],
  string,
  { rejectValue: string; extra: ThunkExtraArgument }
>(
  "clippers/getClipperGuidelines",
  async (id: string, { rejectWithValue, extra }) => {
    const { api } = extra;
    try {
      const response = await api.get<ApiResponse<Guidelines[]>>(
        `/clippers/guidelines/${id}`
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to fetch clipper guidelines"
      );
    }
  }
);
