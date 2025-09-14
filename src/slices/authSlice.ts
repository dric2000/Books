import { authAPI } from "@/services/api";
import type { AuthState, LoginCredentials, User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken") ?? null,
  isAuthentificated: Boolean(localStorage.getItem("accessToken")),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.login(credentials);
      dispatch(fetchCurrentUser());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur de connexion"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authAPI.logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return (await authAPI.getCurrentUser()) as User;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur de chargement du profil"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthentificated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })

      // Logout

      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthentificated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })

      // Récupération de l'utilisateur connecté

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthentificated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isAuthentificated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
