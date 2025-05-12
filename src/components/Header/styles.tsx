import styled from "styled-components";
import { Divider, Layout } from "antd";
const { Header } = Layout;
import { MenuOutlined } from "@ant-design/icons";

export const StyledHeader = styled(Header)`
  background-color: ${({ theme }) => theme.token.colorBgLayout};
  padding: 0;
  height: 40px;
  overflow: visible;
  position: relative;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
`;

export const SvgContainer = styled.div<{ hideLogo: boolean }>`
  margin-left: -34px;
  cursor: pointer;

  opacity: ${({ hideLogo }) => (!hideLogo ? "1" : "0")};
  transition: ${({ hideLogo }) => (!hideLogo ? "opacity 1.2s" : "opacity 0s")};

  svg {
    path {
      fill: ${({ theme }) => theme.token.colorTextBase};
    }
  }
`;

const DIVIDER_LEFT_SPACE = "160px";

export const StyledDivider = styled(Divider)<{ mounted: boolean }>`
  position: absolute;
  top: 40px;
  left: ${DIVIDER_LEFT_SPACE};
  max-width: calc(100% - ${DIVIDER_LEFT_SPACE});
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
  //margin: 14px;
`;
