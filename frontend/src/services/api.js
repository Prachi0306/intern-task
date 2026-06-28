import axios from 'axios';

/**
 * Axios instance with base URL, timeout, and interceptors.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — extract data, normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    const errors = error.response?.data?.errors || [];

    return Promise.reject({
      message,
      errors,
      status: error.response?.status || 500,
    });
  }
);

export default api;
