import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import BarraAbas from "components/BarraAbas";
import LayoutMenuAside from "components/LayoutMenuAside";

const widthMenu = 240;

export default function LayoutBase() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <LayoutMenuAside
        collapsed={collapsed}
        onToogleCollapsed={setCollapsed}
        widthMenu={widthMenu}
      />
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <BarraAbas />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
