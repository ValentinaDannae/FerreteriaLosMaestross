import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <section className="seccion" style={{ textAlign: "center", padding: "100px 20px" }}>
      <h2>Error 404</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="boton">Volver al Inicio</Link>
    </section>
  );
}