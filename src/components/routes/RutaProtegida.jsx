import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RutaProtegida({ children, adminOnly = false }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}