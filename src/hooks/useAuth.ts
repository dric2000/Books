// hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, loginUser, logoutUser } from "../slices/authSlice";
import type { AppDispatch, RootState } from "../store/store";
import type { LoginCredentials } from "@/types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Récupération des états depuis le store

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );
  const isAuthentificated = useSelector(
    (state: RootState) => state.auth.isAuthentificated
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  // Fonctions pour dispatcher les actions

  const login = (credentials: LoginCredentials) =>
    dispatch(loginUser(credentials));
  const logout = () => dispatch(logoutUser());
  const fetchUser = () => dispatch(fetchCurrentUser());

  return {
    user,
    token,
    refreshToken,
    isAuthentificated,
    isLoading,
    error,
    login,
    logout,
    fetchUser,
  };
};
