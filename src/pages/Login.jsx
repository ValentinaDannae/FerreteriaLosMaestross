import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validarLogin } from "../funciones/validaciones";

export default function Login() {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarLogin(datos.correo, datos.contrasena);
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    const exito = iniciarSesion(datos.correo, datos.contrasena);
    if (exito) {
      navigate("/"); // Redirige al inicio tras login exitoso
    } else {
      setErrores({ general: "Credenciales incorrectas" });
    }
  };

  return (
    <section className="login">
      <h2>Iniciar sesión</h2>
      <p>Ingresa a tu cuenta para consultar tus compras y acceder a las funciones disponibles.</p>
      
      {errores.general && <p style={{ color: "red", textAlign: "center" }}>{errores.general}</p>}

      <form className="formulario-login" onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico</label>
          <input type="email" name="correo" value={datos.correo} onChange={handleChange} />
          {errores.correo && <span style={{ color: "red", fontSize: "12px" }}>{errores.correo}</span>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="contrasena" value={datos.contrasena} onChange={handleChange} />
          {errores.contrasena && <span style={{ color: "red", fontSize: "12px" }}>{errores.contrasena}</span>}
        </div>
        <button type="submit">Ingresar</button>
      </form>

      <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      <p><Link to="/">Volver al Inicio</Link></p>
    </section>
  );
}