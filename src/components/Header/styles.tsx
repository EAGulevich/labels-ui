import { Divider, Layout } from "antd";
import styled from "styled-components";

const HEADER_HEIGHT = 40;
const HEADER_HEIGHT_PX = HEADER_HEIGHT + "px";
const ANIMATION_SPEED = "1.2s";

const COMPUTED_LOGO_HEIGHT = HEADER_HEIGHT * 1.75;
const COMPUTED_LOGO_WIDTH = COMPUTED_LOGO_HEIGHT * 2.15;
const COMPUTED_DIVIDER_LEFT_SPACE = COMPUTED_LOGO_WIDTH + 10;

const COMPUTED_LOGO_HEIGHT_PX = COMPUTED_LOGO_HEIGHT + "px";
const COMPUTED_LOGO_WIDTH_PX = COMPUTED_LOGO_WIDTH + "px";
const COMPUTED_DIVIDER_LEFT_SPACE_PX = COMPUTED_DIVIDER_LEFT_SPACE + "px";

export const StyledHeader = styled(Layout.Header)`
  background-color: ${({ theme }) => theme.token.colorBgLayout};
  padding: 0;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  height: ${HEADER_HEIGHT_PX};
  padding: 0 10px;
`;

export const SvgContainer = styled.div<{ $hideLogo: boolean }>`
  cursor: pointer;

  opacity: ${({ $hideLogo }) => (!$hideLogo ? "1" : "0")};
  transition: ${({ $hideLogo }) =>
    !$hideLogo ? `opacity ${ANIMATION_SPEED}` : "opacity 0s"};

  svg {
    width: ${COMPUTED_LOGO_WIDTH_PX};
    height: ${COMPUTED_LOGO_HEIGHT_PX};
  }

  svg > path {
    fill: ${({ theme }) => theme.token.colorTextBase};
  }

  svg:hover > path {
    fill: ${({ theme }) => theme.token.colorTextSecondary};
  }
`;

export const StyledDivider = styled(Divider)<{ $isDividerVisible: boolean }>`
  position: absolute;
  top: ${HEADER_HEIGHT_PX};
  left: ${COMPUTED_DIVIDER_LEFT_SPACE_PX};
  max-width: calc(100% - ${COMPUTED_DIVIDER_LEFT_SPACE_PX});
  min-width: 0;
  border-color: ${({ theme }) => theme.token.colorTextBase};
  margin: 0;

  width: ${({ $isDividerVisible }) =>
    $isDividerVisible ? `calc(100% - ${COMPUTED_DIVIDER_LEFT_SPACE_PX})` : "0"};
  opacity: ${({ $isDividerVisible }) => ($isDividerVisible ? "1" : "0")};

  transition:
    width ${ANIMATION_SPEED},
    opacity ${ANIMATION_SPEED};
`;

export const StyledInfoHeader = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 10px;

  > * {
    margin: 0;
  }
`;
