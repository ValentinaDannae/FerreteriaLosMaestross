import { Link } from "react-router-dom";

export default function TarjetaCategoria({ categoria }) {
  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        <img src={categoria.imagen} alt={categoria.nombre} />
      </div>
      <h3>{categoria.nombre}</h3>
      <p>{categoria.descripcion}</p>
      <Link to={`/productos#${categoria.id}`} className="boton">
        Ver productos
      </Link>
    </article>
  );
}