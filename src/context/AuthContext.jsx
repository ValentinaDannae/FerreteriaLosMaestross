import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Credenciales estáticas (según la pauta)
const USUARIO_ADMIN = {
  correo: "admin@losmaestros.cl",
  contrasena: "Admin123",
  nombre: "Administrador",
  rol: "admin"
};

export function AuthProvider({ children }) {
  // Inicializa el estado leyendo desde localStorage
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario_sesion");
    return guardado ? JSON.parse(guardado) : null;
  });

  const iniciarSesion = (correo, contrasena) => {
    if (correo === USUARIO_ADMIN.correo && contrasena === USUARIO_ADMIN.contrasena) {
      setUsuario(USUARIO_ADMIN);
      localStorage.setItem("usuario_sesion", JSON.stringify(USUARIO_ADMIN));
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario_sesion");
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);