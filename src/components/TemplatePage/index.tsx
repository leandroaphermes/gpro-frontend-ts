import React from "react";

import PageHeader, { PageHeaderProps } from "components/PageHeader";

import { Wrapper, ContentPage, EnumContainerProp } from "./styles";

export type BaseTemplateProps = {
  container?: EnumContainerProp;
  children: React.ReactNode;
  pageHeader: PageHeaderProps;
};

export default function BaseTemplate({
  children,
  pageHeader: headerProps,
  container,
}: BaseTemplateProps) {
  return (
    <Wrapper>
      <PageHeader {...headerProps} />
      <ContentPage container={container}>{children}</ContentPage>
    </Wrapper>
  );
}
