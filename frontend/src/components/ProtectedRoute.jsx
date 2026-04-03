import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If no user is logged in, redirect them instantly to the Login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, allow them to enter the page
  return children;
}