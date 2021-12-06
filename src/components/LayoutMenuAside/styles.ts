import { Layout, Typography } from "antd";
import styled from "styled-components";


export const LayoutSider = styled(Layout.Sider)`
  height: 100vh;
  position: relative;
`

export const WrapperBrand = styled.div`
  text-align: center;
  color: #FFF;
  padding: 10px;
`

export const BrandTitle = styled(Typography.Title)`
  margin-bottom: 0px !important;
  color: #FFF !important;
`

export const BrandSubTitle = styled(Typography.Text)`
  color: #EEE !important;
`

export const ContainerVersao = styled.div`
  text-align: center;
`

export const TextVersao = styled.span`
  color: rgba(255,255,255, 0.4);
  font-size: 12px;
  text-align: "center";
`

export const LinkSuporte = styled.a`
  color: rgba(255,255,255, 0.4);
  font-size: 12px;
`

export const ContainerUsuario = styled.div`
  text-align: center;
`

export const ContainerUsuarioText = styled.span`
  color: rgba(255,255,255, 0.4);
  font-size: 12px;
`