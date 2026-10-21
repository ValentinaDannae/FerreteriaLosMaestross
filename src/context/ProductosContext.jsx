import { createContext, useContext, useState } from "react";
import { productos as productosIniciales } from "../data/productos";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(productosIniciales);

  // Función para crear producto temporalmente (CRUD en memoria)
  const crearProducto = (nuevoProducto) => {
    const productoFinal = {
      ...nuevoProducto,
      // Asigna imagen genérica por defecto (requisito de la pauta)
      imagen: "img/default.jpg", 
      id: nuevoProducto.id || `prod-${Date.now()}`
    };
    setProductos([...productos, productoFinal]);
  };

  return (
    <ProductosContext.Provider value={{ productos, crearProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);