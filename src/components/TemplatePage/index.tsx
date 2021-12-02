import { Collapse } from "antd";
import React from "react";

import PageHeader, { PageHeaderProps } from "components/PageHeader";

import { Wrapper, ContentPage } from "./styles";

export type BaseTemplateProps = {
  children: React.ReactNode;
  pageHeader: PageHeaderProps;
};

export default function BaseTemplate({
  children,
  pageHeader: headerProps,
}: BaseTemplateProps) {
  return (
    <Wrapper>
      <div>
        <PageHeader {...headerProps} />
        <div style={{ background: "#fff", margin: "10px 15px" }}>
          <Collapse ghost>
            <Collapse.Panel key="filtros" header="Opções de Filtro">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut
              adipisci suscipit nostrum vel debitis, eos ab voluptate iste
              molestiae, itaque dolores ex sint assumenda quam porro
              necessitatibus repellendus obcaecati. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error aut adipisci suscipit nostrum
              vel debitis, eos ab voluptate iste molestiae, itaque dolores ex
              sint assumenda quam porro necessitatibus repellendus obcaecati.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aut
              adipisci suscipit nostrum vel debitis, eos ab voluptate iste
              molestiae, itaque dolores ex sint assumenda quam porro
              necessitatibus repellendus obcaecati. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error aut adipisci suscipit nostrum
              vel debitis, eos ab voluptate iste molestiae, itaque dolores ex
              sint assumenda quam porro necessitatibus repellendus obcaecati.
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
      <ContentPage>{children}</ContentPage>
    </Wrapper>
  );
}
