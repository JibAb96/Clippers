import { createAsyncThunk } from "@reduxjs/toolkit";
import { Registration } from "../../zodschema/schemas";
import type { ThunkExtraArgument } from "../store"; // Import the extra argument type

// Define a more specific error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Helper type to extract creator data from the discriminated union
export type CreatorDataForApi = Omit<
  Extract<Registration, { role: "creator" }>,
  "cPassword" | "role"
>;
// Helper type to extract clipper data from the discriminated union
export type ClipperDataForApi = Omit<
  Extract<Registration, { role: "clipper" }>,
  "cPassword" | "role"
>;

// Thunk for registering a creator
export const registerCreator = createAsyncThunk(
  "user/registerCreator",
  async (creatorData: CreatorDataForApi, { rejectWithValue, extra }) => {
    const { api } = extra as ThunkExtraArgument; // Get api from extra argument
    try {
      // The `creatorData` already has the correct shape based on CreatorDataForApi
      // No need to manually pick fields if the input to the thunk is already shaped correctly.
      const response = await api.post("auth/register/creator", creatorData);
      return response.data; 
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to register creator"
      );
    }
  }
);

// Thunk for registering a clipper
export const registerClipper = createAsyncThunk(
  "user/registerClipper",
  async (clipperData: ClipperDataForApi, { rejectWithValue, extra }) => {
    const { api } = extra as ThunkExtraArgument;
    try {
      // The `clipperData` already has the correct shape based on ClipperDataForApi
      const response = await api.post("auth/register/clipper", clipperData);
      // Assuming the API returns some user data or a success message
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to register clipper"
      );
    }
  }
);



// Define login credentials type
export interface LoginCredentials {
  email: string;
  password: string;
}

// Thunk for logging in a creator
export const loginCreator = createAsyncThunk(
  "user/loginCreator",
  async (credentials: LoginCredentials, { rejectWithValue, extra }) => {
    const { api } = extra as ThunkExtraArgument;
    try {
      const response = await api.post("auth/login/creator", credentials);
      // Assuming the API returns user data, token, and refreshToken
      localStorage.setItem("token", response.data.token);
      if (response.data.refreshToken) {
        // Check if refreshToken exists
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("You have successfully logged in:", response);

      return response.data; // This should include user, token, and refreshToken
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to login as creator"
      );
    }
  }
);

// Thunk for logging in a clipper
export const loginClipper = createAsyncThunk(
  "user/loginClipper",
  async (credentials: LoginCredentials, { rejectWithValue, extra }) => {
    const { api } = extra as ThunkExtraArgument;
    try {
      const response = await api.post("auth/login/clipper", credentials);
      // Assuming the API returns user data, token, and refreshToken
      localStorage.setItem("token", response.data.token);
      if (response.data.refreshToken) {
        // Check if refreshToken exists
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("You have successfully logged in:", response);

      return response.data; // This should include user, token, and refreshToken
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to login as clipper"
      );
    }
  }
);
