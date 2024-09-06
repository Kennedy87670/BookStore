// // src/utils/axiosInstance.js
// import axios from "axios";

// const BASE_URL = "http://localhost:7000/api/v1/";

// // Axios instance for requests without token
// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// // Axios instance for requests with token
// export const axiosAuthInstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosAuthInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to handle token expiration
// axiosAuthInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         try {
//           // Fetch new access token using refresh token
//           const response = await axiosInstance.post("/auth/refresh-token", {
//             token: refreshToken,
//           });
//           localStorage.setItem("accessToken", response.data.accessToken);

//           axiosAuthInstance.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${response.data.accessToken}`;
//           return axiosAuthInstance(originalRequest);
//         } catch (err) {
//           console.error("Refresh token expired. Please login again.");
//           // Optionally, you can redirect to login here
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// src/utils/axiosInstance.js
import axios from "axios";

const BASE_URL = "http://localhost:7000/api/v1/";

// Create a helper function to get access token
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Axios instance for requests without a token
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Axios instance for requests with a token
export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add the Authorization header
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          // Fetch new access token using the refresh token
          const response = await axiosInstance.post("/auth/refresh-token", {
            token: refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken); // Update access token in local storage

          // Update Authorization header for future requests
          axiosAuthInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          // Retry original request with new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosAuthInstance(originalRequest);
        } catch (err) {
          console.error(
            "Refresh token expired or invalid. Redirecting to login."
          );
          // Optionally, redirect to login or clear tokens here
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

// Utility functions to clear tokens on logout
export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Usage of clearAuthTokens can be in a logout function or when tokens are invalid
