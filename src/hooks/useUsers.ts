// hooks/useUsers.ts
import { fetchUsers } from "@/slices/usersSlice";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";

export const useUsers = (
  autoFetch: boolean = true,
  filters?: { page?: number; page_size?: number }
) => {
  const dispatch = useAppDispatch();
  const { data, loading, error, pagination } = useAppSelector(
    (state: RootState) => state.users
  );

  const [currentPage, setCurrentPage] = useState(filters?.page || 1);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchUsers({ page: currentPage, limit: filters?.page_size }));
    }
  }, [dispatch, autoFetch, currentPage, filters?.page_size]);

  const refetch = (page?: number, limit?: number) => {
    if (page) setCurrentPage(page);
    dispatch(fetchUsers({ page: page || currentPage, limit }));
  };

  const goToNextPage = () => {
    if (pagination.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filtrer les clients (supposons que le type_user "client" existe)
  const clients = data.filter((user) => user.type_user === "client");

  return {
    users: data,
    clients,
    loading,
    error,
    pagination,
    currentPage,
    refetch,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  };
};
