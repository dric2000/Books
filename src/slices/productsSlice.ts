import { productsAPI } from "@/services/api";
import type {Product, ProductCredentials, ProductsState} from "@/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      let allProducts: Product[] = [];
      let nextUrl: string | null = null;
      let page = 1;

      do {
        const response = await productsAPI.getAll({ page, page_size: 1000 }); // Récupérer 100 par page
        allProducts = [...allProducts, ...response.data.results];
        nextUrl = response.data.next;
        page++;
      } while (nextUrl);

      return allProducts;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors du chargement des produits"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: ProductCredentials, { rejectWithValue }) => {
    try {
      const response = await productsAPI.create(productData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'ajout du produit"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, productData }: { id: number; productData: Partial<ProductCredentials> },
    { rejectWithValue }
  ) => {
    try {
      const response = await productsAPI.update(id, productData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de la mise à jour du produit"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await productsAPI.delete(id);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      return rejectWithValue(
        error.response?.data || "Erreur lors de la suppression du produit"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Add product
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update product
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete product
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
