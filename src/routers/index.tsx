import { BrowserRouter, Route, Routes } from "react-router-dom";
import LaoutBaseTemplate from "components/LayoutBase";

import Home from "pages/home";
import Error404 from "pages/Error404";

export default function Routers() {
  return (
    <BrowserRouter>
      <LaoutBaseTemplate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </LaoutBaseTemplate>
    </BrowserRouter>
  );
}
