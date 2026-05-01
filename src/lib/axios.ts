import { logout } from "@/redux/Auth/slice";
import store from "@/redux/store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: { resolve: () => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
  failedQueue = [];
};

// ---------------- REQUEST INTERCEPTOR ----------------
api.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;

  return config;
});

// ---------------- RESPONSE INTERCEPTOR ----------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshCall = originalRequest?.url?.includes("/v1/auth/refresh");
    const isAuthCheckCall = originalRequest?.url?.includes("/me");

    // Never intercept the refresh endpoint — bail out immediately
    if (isRefreshCall) {
      processQueue(error);
      isRefreshing = false;
      store.dispatch(logout());
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // /me 401 just means "not logged in" — don't attempt refresh
      if (isAuthCheckCall) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // Already refreshing → queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post("/v1/auth/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        store.dispatch(logout());
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error.response?.data ?? error);
  },
);

export default api;
