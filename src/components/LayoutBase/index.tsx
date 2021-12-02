import { Layout } from 'antd'
import React, { useState } from 'react'


import LayoutMenuAside from 'components/LayoutMenuAside'

const widthMenu = 240

type LayoutBaseProps = {
  children: React.ReactElement
}

export default function LayoutBase({ children }: LayoutBaseProps) {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutMenuAside collapsed={collapsed}  onToogleCollapsed={setCollapsed} widthMenu={widthMenu} />
      <Layout style={{ marginLeft: !collapsed ? widthMenu : 80, height: "100%" }}>
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
