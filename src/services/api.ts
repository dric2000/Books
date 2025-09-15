import type {
  ApiResponse,
  Category,
  Commande,
  CreateCommandeData,
  LoginCredentials,
  LoginResponse,
  PaginationParams,
  Product,
  TokenResponse,
  User,
} from "@/types";
import axios, { type AxiosResponse } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Un intercepteur pour rafraichir le token quand il expire

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_KEY);
        if (refreshToken) {
          const response = await refreshClient.post("/token/refresh/", {
            refresh: refreshToken,
          });
          const { access } = response.data;
          localStorage.setItem(ACCESS_KEY, access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post("/token/", credentials);

    localStorage.setItem(ACCESS_KEY, response.data.access);
    localStorage.setItem(REFRESH_KEY, response.data.refresh);

    return {
      user: response.data,
      token: response.data.access,
      refreshToken: response.data.refresh,
    };
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await api.get(`/profile/`);
    return response.data;
  },

  refreshToken: async (): Promise<TokenResponse> => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post<TokenResponse>("/api/token/refresh/", {
      refresh: refreshToken,
    });

    localStorage.setItem(ACCESS_KEY, response.data.access);
    return response.data;
  },
};

const createAPIMethods = <T extends { id: number }>(endpoint: string) => ({
  getAll: (params?: PaginationParams): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.get(`/${endpoint}/`, { params }),
  getById: (id: number): Promise<AxiosResponse<T>> =>
    api.get(`/${endpoint}/${id}/`),
  create: (
    data: Omit<T, "id" | "created_at" | "updated_at">
  ): Promise<AxiosResponse<T>> => api.post(`/${endpoint}/`, data),
  update: (id: number, data: Partial<T>): Promise<AxiosResponse<T>> =>
    api.put(`/${endpoint}/${id}/`, data),
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/${endpoint}/${id}/`),
});

export const productsAPI = createAPIMethods<Product>("articles");
export const categoriesAPI = createAPIMethods<Category>("categories");
export const usersAPI = createAPIMethods<User>("users");

// Service spécifique pour les commandes
export const salesAPI = {
  // Méthodes génériques héritées
  ...createAPIMethods<Commande>("commandes"),

  // Méthode spécifique pour la création de commandes
  createCommande: (
    data: CreateCommandeData
  ): Promise<AxiosResponse<Commande>> => api.post(`/commandes/`, data),
};

export default api;
