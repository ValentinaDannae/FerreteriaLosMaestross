import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Perfil() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="seccion">
      <h2>Mi Perfil</h2>
      <div className="tarjeta" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h3>{usuario.nombre}</h3>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>
    </section>
  );
}