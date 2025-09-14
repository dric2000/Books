import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCurrentUser } from "@/slices/authSlice";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isAuthentificated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, user, isLoading])


  useEffect(() => {
    // Rediriger seulement après avoir vérifié l'authentification
    if (!isLoading && !isAuthentificated) {
      navigate("/connexion-admin", { replace: true });
    }
  }, [isAuthentificated, isLoading, navigate]);

  if (!isAuthentificated) {
    return null; // La navigation se fait dans l'useEffect
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes
