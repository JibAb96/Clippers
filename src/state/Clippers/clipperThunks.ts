import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch all clippers
export const fetchClippers = createAsyncThunk(
  "clippers/fetchClippers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/clippers");
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error || "Failed to fetch clippers"
      );
    }
  }
);

// Search clippers
export const searchClippers = createAsyncThunk(
  "clippers/searchClippers",
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/clippers/search?q=${encodeURIComponent(searchQuery)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as { response?: { data: unknown } })?.response?.data || "Failed to search clippers"
      );
    }
  }
);

// Get clipper by ID
export const getClipperById = createAsyncThunk(
  "clippers/getClipperById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/clippers/${id}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data: unknown } })?.response?.data || "Failed to fetch clipper"
      );
    }
  }
);

// Get clipper portfolio images by id

export const getClipperPortfolioImages = createAsyncThunk(
  "clippers/getClipperPortfolioImages",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/clippers/portfolio-images/${id}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data: unknown } })?.response?.data || "Failed to fetch clipper portfolio images"
      );
    }
  }
);

export const getClipperGuidelines = createAsyncThunk(
  "clippers/getClipperGuidelines",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/clippers/guidelines/${id}`);
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data: unknown } })?.response?.data || "Failed to fetch clipper guidelines"
      );
    }
  }
);
