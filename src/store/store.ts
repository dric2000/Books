import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/authSlice";
import categoriesReducer from "../slices/categoriesSlice";
import productsReducer from "../slices/productsSlice";
import salesReducer from "../slices/salesSlice";
import usersReducer from "../slices/usersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    auth: userReducer,
    users: usersReducer,
    sales: salesReducer,
  },
});

// Types pour le state et le dispatch Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
