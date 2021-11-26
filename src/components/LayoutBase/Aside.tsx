import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'


import { WrapperBrand } from './styles'

export type AsideProps = {
  collapsed: boolean,
  onToogleCollapsed: (collapse: boolean) => void,
  widthMenu: number
}

export default function Aside({ collapsed, onToogleCollapsed, widthMenu } : AsideProps) {
  return (
    <Layout.Sider 
      collapsible 
      breakpoint="lg"
      collapsed={collapsed} 
      onCollapse={onToogleCollapsed}
      onBreakpoint={onToogleCollapsed}
      width={widthMenu}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
        <WrapperBrand>
          <Typography.Title level={2} style={{ marginBlock: "0px" }} >{process.env.REACT_APP_NAME}</Typography.Title>
          {!collapsed && <Typography.Text type="secondary" >{process.env.REACT_APP_SUBNAME}</Typography.Text>}
          <div>
            <span>{process.env.REACT_APP_VERSION}</span>{' '}
          </div>
        </WrapperBrand>
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
    </Layout.Sider>
  )
}
