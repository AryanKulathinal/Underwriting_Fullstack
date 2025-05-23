import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
