import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutasAdministrador from "./components/routes/RutasAdministrador";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import Error404 from "./components/views/Error404";
import Login from "./components/views//Login";

import { useState } from "react";

const App = () => {
  const usuarioStorage = JSON.parse(sessionStorage.getItem('usuario')) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioStorage);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Login>}></Route>
        <Route exact path="/administrador/*" element={
          <RutasProtegidas>
            <RutasAdministrador usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></RutasAdministrador>
          </RutasProtegidas>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;