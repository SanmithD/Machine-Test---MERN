import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth, checkAuth } = UseAuthStore();

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
