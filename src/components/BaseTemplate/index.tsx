import { Collapse } from 'antd'
import React from 'react'

import PageHeader, { PageHeaderProps } from '../PageHeader'

import { Wrapper, Content } from './styles'

export type BaseTemplateProps = {
  children: React.ReactNode,
} & PageHeaderProps

export default function BaseTemplate({ children, title, subTitle, acoesMenu }: BaseTemplateProps) {
  return (
    <Wrapper>
      <div>
        <PageHeader title={title} subTitle={subTitle} acoesMenu={acoesMenu} />
        <div style={{ background: "#fff", margin: "10px 15px" }} >
          <Collapse ghost >
            <Collapse.Panel key="filtros" header="Opções de Filtro"  >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut adipisci suscipit nostrum vel debitis, eos ab voluptate iste molestiae, itaque dolores ex sint assumenda quam porro necessitatibus repellendus obcaecati.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut adipisci suscipit nostrum vel debitis, eos ab voluptate iste molestiae, itaque dolores ex sint assumenda quam porro necessitatibus repellendus obcaecati.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut adipisci suscipit nostrum vel debitis, eos ab voluptate iste molestiae, itaque dolores ex sint assumenda quam porro necessitatibus repellendus obcaecati.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut adipisci suscipit nostrum vel debitis, eos ab voluptate iste molestiae, itaque dolores ex sint assumenda quam porro necessitatibus repellendus obcaecati.
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
      <Content>{children}</Content>
    </Wrapper>
  )
}
