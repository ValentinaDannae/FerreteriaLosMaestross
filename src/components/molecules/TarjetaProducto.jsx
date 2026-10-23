import { Link } from "react-router-dom";

export default function TarjetaProducto({ producto }) {
  const formatarPrecio = (precio) => "$" + precio.toLocaleString("es-CL");

  return (
    <article className="tarjeta-producto">
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
  );
}