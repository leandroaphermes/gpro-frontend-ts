import React from "react";

import PageHeader, { PageHeaderProps } from "components/PageHeader";

import { Wrapper, ContentPage, EnumContainerProp } from "./styles";

export type BaseTemplateProps = {
  container?: EnumContainerProp;
  children: React.ReactNode;
  headerProps: PageHeaderProps;
};

export default function BaseTemplate({
  children,
  headerProps,
  container,
}: BaseTemplateProps) {
  return (
    <Wrapper>
      <PageHeader {...headerProps} />
      <ContentPage container={container}>{children}</ContentPage>
    </Wrapper>
  );
}
