// src/utils/axiosInstance.js
// This file creates and exports a pre-configured Axios instance.
// Using an instance allows you to set a base URL and other defaults
// that apply to all requests made with this instance.

import axios from 'axios'; // Import the axios library

// Create an Axios instance.
// The baseURL is the common part of all your backend API endpoints.
// IMPORTANT: Replace 'http://localhost:5000' with your actual backend API URL
// when deploying your React app (e.g., 'https://api.dure.com').
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4001/api', // All requests will be prefixed with this URL + /api
  timeout: 10000, // Optional: Request timeout in milliseconds (10 seconds)
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Optional: Add a request interceptor (for future use, e.g., adding auth tokens)

axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add an authorization token to every request
    const token = localStorage.getItem('authToken'); // Or wherever your token is stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Optional: Add a response interceptor (for future use, e.g., global error handling)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ignore aborted requests (not an error)
    if (error.name === 'AbortError' || error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }
    
    // Example: Handle 401 Unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request. Redirecting to login...');
      // You might redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// Export the configured Axios instance for use throughout your application.
export default axiosInstance;