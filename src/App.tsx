import { Layout, Menu } from "antd";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from "react";
import Home from "./pages/home";

const { Sider, Content } = Layout;

function App() {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
      </Sider>
      <Layout style={{ marginLeft: !collapsed ? 200 : 80, height: "100%" }}>
        <Content>
          <Home />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
