import { ArrowLeftOutlined, MenuOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Space, Typography } from 'antd'

import { Wrapper, Title } from './styles'

export type PageHeaderProps = {
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  acoesMenu?: JSX.Element
}

export default function PageHeader({ acoesMenu }: PageHeaderProps) {
  return (
    <Wrapper>
      <Space align="center">
        <Button type="text" size="large" icon={<ArrowLeftOutlined />} />
        <Space align="baseline">
          <Title level={2} >Home</Title>
          <Typography.Text type="secondary"  >descrição</Typography.Text>
        </Space>
      </Space>
      <Space>
        <Input.Search size="middle" enterButton placeholder="Buscar" />
      </Space>
      <Space>
        <Button size="middle" type="primary" icon={<SaveOutlined />} >Salvar</Button>
        {acoesMenu && (
          <Dropdown overlay={acoesMenu} trigger={['click']}>
            <Button 
              size="middle" 
              type="default" 
              icon={<MenuOutlined />} 
              style={{ background: "#e68f2c", color: "#FFF" }} 
            >Ações</Button>
          </Dropdown>
        )}
      </Space>
    </Wrapper>
  )
}
