import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
export interface ErrorResponse {
  message: string;
  code?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const OriginalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post("/refreshtoken", refreshToken);
          const { token } = response.data;
          if (OriginalRequest && OriginalRequest.headers) {
            OriginalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(OriginalRequest);
          }
        }
      } catch (refreshToken) {
        localStorage.remove("accessToken");
        localStorage.remove("refreshToken");
        window.location.href = "/";
      }
    }

    const errorResponse: ErrorResponse = {
      message: "An error occured",
    };

    if (error.response?.data) {
      errorResponse.message = error.response.data.message;
      errorResponse.code = error.response.data.code;
    }
  }
);

export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRequest = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);
