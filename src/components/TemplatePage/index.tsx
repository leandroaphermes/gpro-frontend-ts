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
      <PageHeader {...headerProps} />
      <ContentPage>{children}</ContentPage>
    </Wrapper>
  );
}
