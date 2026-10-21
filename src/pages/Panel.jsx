import { useState } from "react";
import { Form, Button, Table, Alert } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import { validarProducto } from "../funciones/validaciones";

export default function Panel() {
  const { productos, crearProducto } = useProductos();
  
  const [form, setForm] = useState({
    nombre: "", categoria: "herramientas-electricas", precio: "", stock: "", descripcion: ""
  });
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosParaValidar = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
    const erroresValidacion = validarProducto(datosParaValidar);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Crea el producto (el Context le asigna automáticamente img/default.jpg)
    crearProducto(datosParaValidar);
    setExito(true);
    setForm({ nombre: "", categoria: "herramientas-electricas", precio: "", stock: "", descripcion: "" });
    setErrores({});
    setTimeout(() => setExito(false), 3000);
  };

  return (
    <section className="seccion">
      <h2>Panel de Control</h2>
      <p>Gestión de productos (CRUD en memoria).</p>

      {exito && <Alert variant="success">Producto creado correctamente.</Alert>}

      <h3>Agregar Nuevo Producto</h3>
      <Form onSubmit={handleSubmit} className="formulario-registro" style={{ maxWidth: "500px", margin: "0 auto 40px auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} isInvalid={!!errores.nombre} />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="herramientas-electricas">Herramientas Eléctricas</option>
            <option value="gasfiteria">Gasfitería</option>
            <option value="electricidad">Electricidad</option>
            <option value="construccion">Construcción</option>
            <option value="herramientas-manuales">Herramientas Manuales</option>
            <option value="ferreteria-general">Ferretería General</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="precio" value={form.precio} onChange={handleChange} isInvalid={!!errores.precio} />
          <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} isInvalid={!!errores.stock} />
          <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} name="descripcion" value={form.descripcion} onChange={handleChange} isInvalid={!!errores.descripcion} />
          <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="boton" style={{ width: "100%" }}>
          Crear Producto
        </Button>
      </Form>

      <h3>Catálogo Actual</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}