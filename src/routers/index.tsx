import { Route, Routes } from "react-router-dom";
import LayoutBase from "components/LayoutBase";

import Home from "pages/Home";
import Error404 from "pages/Error404";
import Clientes from "pages/Clientes";
import ClientesView from "pages/Clientes/ClientesView";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LayoutBase />}>
        <Route index element={<Home />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="clientes/:id" element={<ClientesView />} />
        <Route path="error/404" element={<Error404 />} />
      </Route>
      <Route path="*" element={<Error404 showGoHome />} />
    </Routes>
  );
}
