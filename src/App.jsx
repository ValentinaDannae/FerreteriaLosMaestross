import { Routes, Route } from "react-router-dom";

// Organismos
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import RutaProtegida from "./components/routes/RutaProtegida";

// Páginas
import Index from "./pages/Index";
import Productos from "./pages/Productos";
import Producto from "./pages/Producto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Panel from "./pages/Panel";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import Error404 from "./pages/Error404";

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        
        {/* Rutas Protegidas (Requieren sesión) */}
        <Route 
          path="/perfil" 
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          } 
        />
        
        {/* Ruta Protegida (Requiere sesión y rol de admin) */}
        <Route 
          path="/panel" 
          element={
            <RutaProtegida adminOnly>
              <Panel />
            </RutaProtegida>
          } 
        />
        
        {/* Ruta para error 404 (debe ir al final) */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;