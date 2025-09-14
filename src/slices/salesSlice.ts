import { salesAPI } from "@/services/api";
import type { Commande, CreateCommandeData, SalesState } from "@/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

const initialState: SalesState = {
  data: [],
  loading: false,
  error: null,
};

export const fectchSales = createAsyncThunk<
  Commande[],
  void,
  { rejectValue: string }
>("sales/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await salesAPI.getAll(); // appel de ton api.getAll
    return response.data.results ?? response.data; // si tu as un objet paginé {results, count}
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Erreur de récupération des commandes"
    );
  }
});

// Création d'une commande

export const createSale = createAsyncThunk<
  Commande,
  CreateCommandeData, // ← Type correct pour l'input
  { rejectValue: string }
>("sales/create", async (newCommandeData, { rejectWithValue }) => {
  try {
    // Utilisation de la méthode spécifique
    const response = await salesAPI.createCommande(newCommandeData);
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(err.response?.data?.message || "Erreur de création");
  }
});

// Mise à jour d'une commande

export const updateSale = createAsyncThunk<
  Commande,
  { id: number; data: Partial<Commande> }
>("sales/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await salesAPI.update(id, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Erreur de mise à jour"
    );
  }
});

// Supprimer une commande

export const deleteSale = createAsyncThunk<number, number>(
  "sales/delete",
  async (id, { rejectWithValue }) => {
    try {
      await salesAPI.delete(id);
      return id;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        err.response?.data?.message || "Erreur de suppression"
      );
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    resetSales(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Récupération de toutes les commandes
      .addCase(fectchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fectchSales.fulfilled,
        (state, action: PayloadAction<Commande[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fectchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
      })

      // Création d'une commande
      .addCase(createSale.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Mise à jour d'une commande
      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })

      // Suppression d'une commande
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.data = state.data.filter((c) => c.id !== action.payload);
      });
  },
});

export default salesSlice.reducer;
export const { resetSales } = salesSlice.actions;
