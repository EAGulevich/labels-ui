import styled from "styled-components";
import { Divider, Layout } from "antd";
const { Header } = Layout;
import { MenuOutlined } from "@ant-design/icons";

export const StyledHeader = styled(Header)`
  background-color: ${({ theme }) => theme.token.colorBgBase};
  padding: 0;
  height: 50px;
  position: relative;
`;

export const SvgContainer = styled.div<{ hideLogo: boolean }>`
  margin-left: -30px;
  cursor: pointer;
  //display: ${({ hideLogo }) => (hideLogo ? "none" : "block")};

  opacity: ${({ hideLogo }) => (!hideLogo ? "1" : "0")};
  transition: ${({ hideLogo }) => (!hideLogo ? "all 1.2s" : "all 0s")};

  svg {
    path {
      fill: ${({ theme }) => theme.token.colorTextBase};
    }
  }
`;

export const StyledDivider = styled(Divider)<{ mounted: boolean }>`
  position: absolute;
  top: 40px;
  left: 150px;
  max-width: calc(100% - 150px);
  min-width: 0;
  border-color: ${({ theme }) => theme.token.colorTextBase};
  margin: 0;

  width: ${({ mounted }) => (mounted ? "calc(100% - 150px)" : "0")};
  opacity: ${({ mounted }) => (mounted ? "1" : "0")};

  transition:
    width 1s,
    opacity 1.2s;
`;

export const StyledMenuButton = styled(MenuOutlined)`
  margin: 14px 14px 14px auto;
`;
