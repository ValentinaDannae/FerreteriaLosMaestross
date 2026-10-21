import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { categorias } from "../data/categorias";
import { Link } from "react-router-dom";

export default function Productos() {
  const { productos } = useProductos();
  const location = useLocation();

  // Efecto para hacer scroll a la sección cuando hay un hash en la URL
  useEffect(() => {
    if (location.hash) {
      // Esperar un poco para que la página cargue completamente
      setTimeout(() => {
        const elemento = document.getElementById(location.hash.substring(1));
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

  const formatarPrecio = (precio) => {
    return "$" + precio.toLocaleString("es-CL");
  };

  return (
    <section className="catalogo">
      <h2>Catálogo de productos</h2>
      <p>Encuentra herramientas y materiales para tus proyectos.</p>

      {categorias.map((categoria) => {
        const productosDeCategoria = productos.filter(
          (producto) => producto.categoria === categoria.id
        );

        if (productosDeCategoria.length === 0) return null;

        return (
          <section
            className="categoria-productos"
            id={categoria.id}
            key={categoria.id}
          >
            <h2>{categoria.nombre}</h2>
            <div className="galeria-productos">
              {productosDeCategoria.map((producto) => (
                <article className="tarjeta-producto" key={producto.id}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={(e) => (e.target.src = "/img/default.jpg")}
                  />
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <p className="precio">{formatarPrecio(producto.precio)}</p>
                  <Link to={`/producto/${producto.id}`} className="boton">
                    Ver producto
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}