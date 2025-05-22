import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const AUTH_TOKEN_KEY = 'authToken';

// Load token from localStorage on startup
let authToken: string | null = localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api', // Replace with your Strapi API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Set initial token if present
if (authToken) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // The token is now set directly in defaults, but we keep the interceptor
    // in case the token is updated after the instance is created and before a request is made.
    // Or, if we want to refresh the token from localStorage before each request (more robust but slightly less performant).
    // For now, we will rely on the defaults being updated by setAuthToken.
    // If authToken is in config.headers, it means it was set by an explicit call or the defaults.
    // If not, and we have an authToken in memory (e.g., loaded from localStorage), set it.
    // This logic can be simplified if setAuthToken is the ONLY way token is managed.
    if (authToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance; 