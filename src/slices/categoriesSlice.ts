import { categoriesAPI } from "@/services/api";
import type { CategoriesState, Category, CategoryCredentials } from "@/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

const initialState: CategoriesState = {
  items: [],
  isLoading: false,
  error: null,
};

// Récupération de toutes les catégories

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      let allCategories: Category[] = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        const response = await categoriesAPI.getAll({ page });
        const { results, next } = response.data;

        allCategories = [...allCategories, ...results];

        // Continuer tant qu'il y a une page suivante
        hasNext = next !== null;
        page++;
      }

      return allCategories;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        error.response?.data || "Erreur lors du chargement des catégories"
      );
    }
  }
);

// Ajout d'une nouvelle catégorie

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData: CategoryCredentials, { rejectWithValue }) => {
    try {
      const response = await categoriesAPI.create(categoryData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'ajout de la catégorie"
      );
    }
  }
);

// Modification d'une catégorie

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (
    { id, categoryData }: { id: number; categoryData: Partial<Category> },
    { rejectWithValue }
  ) => {
    try {
      const response = await categoriesAPI.update(id, categoryData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de la mise à jour de la catégorie"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await categoriesAPI.delete(id);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de la suppression de la catégorie"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Récupération de toutes les catégories

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          "Erreur lors du chargement des catégories";
      })

      // Ajout de catégories

      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          "Erreur lors de l'ajout de la catégorie";
      })

      //Modifier une categorie

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          "Erreur lors de la mise à jour de la catégorie";
      })

      // Supprimer une categorie

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          "Erreur lors de la suppression de la catégorie";
      });
  },
});

export default categoriesSlice.reducer;
