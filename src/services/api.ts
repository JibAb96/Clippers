import axios from "axios";

const API_BASE_URL = "https://clippers-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default api;
