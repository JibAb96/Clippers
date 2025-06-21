import axios from "axios";
import { store } from "@/state/store"; // Import the store
import { setUser, logout } from "@/state/User/usersSlice"; // Import actions
import { supabase } from "./supabase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Simplification: Rely primarily on localStorage for the token here.
    // The response interceptor is responsible for updating localStorage after a refresh.
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: string | null) => void;
  reject: (reason?: Error | unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response error interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and not a retry request
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      if (isRefreshing) {
        // If token is already being refreshed, queue the original request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err); // Or handle logout
          });
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (!storedRefreshToken) {
        console.error("No refresh token available. Logging out.");
        store.dispatch(logout()); // Dispatch logout
        // window.location.href = '/signin'; // Optional: redirect
        isRefreshing = false;
        processQueue(error, null);
        return Promise.reject(error);
      }

      try {
        const { data: sessionData, error: refreshError } =
          await supabase.auth.refreshSession({
            refresh_token: storedRefreshToken,
          });

        if (refreshError || !sessionData?.session) {
          console.error("Supabase refresh token failed:", refreshError);
          store.dispatch(logout()); // Dispatch logout
          // window.location.href = '/signin'; // Optional: redirect
          isRefreshing = false;
          processQueue(
            refreshError || new Error("Failed to refresh session"),
            null
          );
          return Promise.reject(refreshError || error);
        }

        const newAccessToken = sessionData.session.access_token;
        const newRefreshToken = sessionData.session.refresh_token; 

        // Update Redux state and localStorage
        store.dispatch(
          setUser({
            user: store.getState().user.user, // Keep existing user details
            token: newAccessToken,
            refreshToken: newRefreshToken,
            role: store.getState().user.userType,
          })
        );
        // localStorage is updated by the setUser action if implemented correctly there

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return api(originalRequest); // Retry the original request with the new token
      } catch (e) {
        console.error("Exception during token refresh:", e);
        store.dispatch(logout());
        isRefreshing = false;
        processQueue(e instanceof Error ? e : new Error(String(e)), null);
        return Promise.reject(e);
      } finally {
        isRefreshing = false; // Reset refreshing state
      }
    }
    // For non-401 errors or if it's already a retry, just reject
    return Promise.reject(error);
  }
);

export default api;
