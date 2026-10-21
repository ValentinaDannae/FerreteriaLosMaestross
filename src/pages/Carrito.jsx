import { useCarrito } from "../context/CarritoContext";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { carrito, vaciarCarrito } = useCarrito();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <section className="seccion">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="boton">Ir al Catálogo</Link>
      </section>
    );
  }

  return (
    <section className="seccion">
      <h2>Carrito de Compras</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>${item.precio.toLocaleString("es-CL")}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3 style={{ textAlign: "right" }}>Total: ${total.toLocaleString("es-CL")}</h3>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <Button variant="danger" onClick={vaciarCarrito}>Vaciar Carrito</Button>
        <Button variant="success" className="boton" onClick={() => alert("Compra simulada exitosamente")}>Finalizar Compra</Button>
      </div>
    </section>
  );
}