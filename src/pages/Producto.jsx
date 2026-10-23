import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";

export default function Producto() {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  
  const producto = productos.find((p) => p.id === id);
  const [cantidad, setCantidad] = useState("");
  const [total, setTotal] = useState(0);

  if (!producto) {
    return (
      <section className="seccion">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="boton">Volver al catálogo</Link>
      </section>
    );
  }

  const formatarPrecio = (precio) => {
    return "$" + precio.toLocaleString("es-CL");
  };

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

  const handleAgregarAlCarrito = () => {
    if (cantidad === "" || Number(cantidad) < 1) {
      alert("Ingrese una cantidad válida");
      return;
    }
    if (Number(cantidad) > producto.stock) {
      alert("Stock insuficiente");
      return;
    }
    
    agregarAlCarrito(producto, Number(cantidad));
    alert(`✅ ${producto.nombre} agregado al carrito`);
    setCantidad("");
    setTotal(0);
  };

  return (
    <section className="detalle-producto">
      <div className="imagen-producto">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          onError={(e) => (e.target.src = "/img/default.jpg")}
        />
      </div>

      <div className="info-producto">
        <h2>{producto.nombre}</h2>
        <p className="precio-producto">{formatarPrecio(producto.precio)}</p>
        <p>{producto.descripcion}</p>

        <h3>Características</h3>
        <ul>
          {producto.caracteristicas.map((caracteristica, index) => (
            <li key={index}>{caracteristica}</li>
          ))}
        </ul>

        <p>Stock disponible: <span>{producto.stock} unidades</span></p>

        <div className="cantidad-producto">
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="1"
            max={producto.stock}
          />
        </div>

        <button className="boton" onClick={calcularTotal}>
          Calcular Total
        </button>

        {total > 0 && (
          <p id="totalProducto">Total: {formatarPrecio(total)}</p>
        )}

        <button 
          className="boton" 
          onClick={handleAgregarAlCarrito}
          style={{ marginTop: "15px", backgroundColor: "#5E8C87" }}
        >
          Agregar al Carrito
        </button>

        <Link 
          to="/productos" 
          className="boton" 
          style={{ display: "block", marginTop: "15px", textAlign: "center" }}
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}