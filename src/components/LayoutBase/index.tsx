import { Layout } from 'antd'
import { useState } from 'react'


import Home from 'pages/home'
import Aside from './Aside'

const widthMenu = 240

export default function LayoutBase() {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Aside collapsed={collapsed}  onToogleCollapsed={setCollapsed} widthMenu={widthMenu} />
      <Layout style={{ marginLeft: !collapsed ? widthMenu : 80, height: "100%" }}>
        <Layout.Content>
          <Home />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
