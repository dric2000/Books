import { usersAPI } from "@/services/api";
import type { PaginationParams, User, UsersState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const fetchUsers = createAsyncThunk<
  {
    results: User[];
    count: number;
    next: string | null;
    previous: string | null;
  },
  PaginationParams,
  { rejectValue: string }
>("users/fetchAll", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await usersAPI.getAll({ page, limit });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Erreur de récupération des utilisateurs"
    );
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.pagination = {
        count: 0,
        next: null,
        previous: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

export default usersSlice.reducer;
export const { resetUsers } = usersSlice.actions;
