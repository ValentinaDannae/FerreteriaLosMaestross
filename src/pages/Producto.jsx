import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

export default function Producto() {
  const { id } = useParams(); // Obtiene el id de la URL (/producto/taladro)
  const { productos } = useProductos();
  
  // Buscar el producto por id
  const producto = productos.find((p) => p.id === id);

  // Estados para manejar la cantidad y el total (interactividad con useState)
  const [cantidad, setCantidad] = useState("");
  const [total, setTotal] = useState(0);

  // Si el producto no existe, mostrar mensaje
  if (!producto) {
    return (
      <section className="seccion">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="boton">Volver al catálogo</Link>
      </section>
    );
  }

  // Función para formatear precio
  const formatarPrecio = (precio) => {
    return "$" + precio.toLocaleString("es-CL");
  };

  // Lógica original de calcularTotal() adaptada a React
  const calcularTotal = () => {
    if (cantidad === "") {
      alert("Debe ingresar una cantidad");
      return;
    }
    if (Number(cantidad) < 1) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }
    if (Number(cantidad) > producto.stock) {
      alert("La cantidad supera el stock disponible");
      return;
    }
    const totalCalculado = Number(cantidad) * producto.precio;
    setTotal(totalCalculado);
  };

  return (
    <section className="detalle-producto">
      <div className="imagen-producto">
        <img
          id="imagenProducto"
          src={producto.imagen}
          alt={producto.nombre}
          onError={(e) => (e.target.src = "img/default.jpg")}
        />
      </div>

      <div className="info-producto">
        <h2 id="nombreProducto">{producto.nombre}</h2>
        <p className="precio-producto" id="precioProducto">
          {formatarPrecio(producto.precio)}
        </p>
        <p id="descripcionProducto">{producto.descripcion}</p>

        <h3>Características</h3>
        <ul id="caracteristicasProducto">
          {producto.caracteristicas.map((caracteristica, index) => (
            <li key={index}>{caracteristica}</li>
          ))}
        </ul>

        <p>
          Stock disponible:{" "}
          <span id="stockProducto">{producto.stock} unidades</span>
        </p>

        <div className="cantidad-producto">
          <label>Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="1"
            max={producto.stock}
          />
        </div>

        <button className="boton" onClick={calcularTotal}>
          Calcular Total
        </button>

        <p id="totalProducto">
          {total > 0 ? `Total: ${formatarPrecio(total)}` : ""}
        </p>

        <Link to="/productos" className="boton">
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}