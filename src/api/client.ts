import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod, METHODS } from '../utils/constant';
import {
  getRefreshToken,
  saveTokens,
  clearTokens,
  getAccessToken,
} from '../utils/tokenStorage';
// import { store as reduxStore } from '../store';
// import {
//   setTokens,
//   clearTokens as clearTokensFromRedux,
// } from '../store/slices/tokenSlice';
import { Alert } from 'react-native';

// Extend Axios types to include custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    isRefreshRequest?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
    isRefreshRequest?: boolean;
  }
}

interface ClientConfig extends AxiosRequestConfig {
  method?: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, unknown>;
  contentType?: 'json' | 'form';
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.177:5000/api',
  timeout: 30000,
});

// Request interceptor - Add token to headers
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getAccessToken();

    if (token && !config.isRefreshRequest) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors and token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Handle 401/403 - Token Expired
    if (
      (status === 401 || status === 403) &&
      !originalRequest?._retry &&
      !originalRequest?.isRefreshRequest
    ) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();
      // const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWMwZGUwY2ZmODUzNTE2ZTIyN2QyYzEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NDM1ODU2MCwiZXhwIjoxNzc0OTYzMzYwfQ.aq-bx57yVqHOQiCS-qb-XqB974vL0ZZ8JrMD9WqmtwU';

      if (refreshToken) {
        try {
          // Call refresh token endpoint directly via axios
          const { data: refreshData } = await axiosInstance({
            method: METHODS.POST,
            url: `/users/refresh-token`,
            data: { refreshToken },
            isRefreshRequest: true,
          });
          console.log('--------------refreshing token--------------');
          if (refreshData?.accessToken) {
            // Save new tokens
            await saveTokens(refreshData.accessToken, refreshData.refreshToken);

            // Update Redux store
            // reduxStore.dispatch(
            //   setTokens({
            //     accessToken: refreshData.accessToken,
            //     refreshToken: refreshData.refreshToken,
            //   }),
            // );

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${refreshData.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      // Logout if refresh fails
      await clearTokens();
      // put alert token expired
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
        [{ text: 'OK' }],
      );
      // reduxStore.dispatch(clearTokensFromRedux());
    }

    // Format error
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'An error occurred';

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
    });
  },
);

// Client function
const client = async <T = any>({
  method = METHODS.POST,
  url,
  data,
  params,
  contentType,
  ...rest
}: ClientConfig): Promise<T> => {
  const headers: any = {
    ...rest.headers,
    'Content-Type':
      contentType === 'form' ? 'multipart/form-data' : 'application/json',
  };

  const response: AxiosResponse<T> = await axiosInstance({
    method,
    url,
    data,
    params,
    headers,
    ...rest,
  });

  return response.data;
};

export default client;
