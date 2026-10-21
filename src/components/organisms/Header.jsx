import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCarrito } from "../../context/CarritoContext";

export default function Header() {
  const { usuario, cerrarSesion } = useAuth();
  const { carrito } = useCarrito();

  // Función para aplicar la clase "active" del CSS original cuando la ruta coincide
  const claseActiva = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header id="encabezado">
      <div className="contenido">
        <div className="logo-section">
          {/* Asegúrate de tener tu logo en public/img/logo.png */}
          <img src="/img/logo.jpg" alt="Logo Ferretería Los Maestros" className="logo" />
          <div className="titulo">
            <h1>Ferretería Los Maestros</h1>
            <p className="eslogan">Materiales de construcción, herramientas y ferretería general</p>
          </div>
        </div>

        <nav id="menu-principal">
          <ul>
            <li><NavLink to="/" end className={claseActiva}>Inicio</NavLink></li>
            <li><NavLink to="/productos" className={claseActiva}>Catálogo</NavLink></li>
            <li><NavLink to="/#contacto" className={claseActiva}>Contacto</NavLink></li>
            
            {/* Carrito (Requisito de interactividad) */}
            <li>
              <NavLink to="/carrito" className={claseActiva}>
                Carrito ({carrito.length})
              </NavLink>
            </li>

            {/* Menú dinámico según si hay sesión o no */}
            {usuario ? (
              <>
                {usuario.rol === "admin" && (
                  <li><NavLink to="/panel" className={claseActiva}>Panel</NavLink></li>
                )}
                <li><NavLink to="/perfil" className={claseActiva}>Mi Perfil</NavLink></li>
                <li>
                  <button onClick={cerrarSesion} className="boton" style={{ width: "100%" }}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={claseActiva}>Iniciar sesión</NavLink></li>
                <li><NavLink to="/registro" className={claseActiva}>Registro</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}