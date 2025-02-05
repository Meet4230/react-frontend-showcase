import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { getItem } from "../utils/localstorage";

interface ErrorResponse {
  statusCode?: number;
  data?: null;
  success?: boolean;
  errors?: Array<Record<string, string>>;
  message?: string;
  code?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor with Proper Error Handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const refreshToken = getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post("/refreshtoken", { refreshToken });
          const { token } = response.data;
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Universal Error Handler for Requests
const handleRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const errorResponse = error.response?.data;

    if (status === 409) {
      throw new Error("User already exists.");
    }

    if (status === 422) {
      throw new Error("Unprocessable Entity: Invalid input.");
    }

    if (errorResponse?.message) {
      throw new Error(errorResponse.message);
    }

    throw new Error("Server responded with an error.");
  } else if (error instanceof TypeError) {
    console.log("JavaScript TypeError:", error.message);
    throw new Error("Network error or invalid data encountered.");
  } else {
    console.log("Unknown Error:", error);
    throw new Error("An unexpected error occurred.");
  }
};

//  GET Request
export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

//  POST Request
export const postRequest = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response = await api.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

//  PATCH Request
export const patchRequest = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

//  DELETE Request
export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response = await api.delete<T>(url, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
