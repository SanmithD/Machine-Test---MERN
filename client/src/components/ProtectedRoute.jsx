import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = UseAuthStore();

  if (isLoading) {
    return <Loader/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
