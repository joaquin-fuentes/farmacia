import { Routes, Route } from "react-router-dom";
import AdminProductos from "../views/AdminProductos"
import Error404 from "../views/Error404";
import CrearProducto from "../views/CrearProducto";
import EditarProducto from "../views/EditarProducto";
import Menu from "../common/Menu";
import Footer from "../common/Footer";

const RutasAdministrador = ({usuarioLogueado, setUsuarioLogueado}) => {
  return (
    <>
      <Menu  usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} ></Menu>
      <Routes>
        <Route path="/" element={<AdminProductos></AdminProductos>}></Route>
        <Route path="/crear" element={<CrearProducto></CrearProducto>}></Route>
        <Route path="/editar/:id" element={<EditarProducto></EditarProducto>}></Route>
        <Route path="*" element={<Error404></Error404>} ></Route> 
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default RutasAdministrador;