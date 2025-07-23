import { Divider } from "antd";
import styled from "styled-components";

const ANIMATION_SPEED = "1.8s";
const MOBILE_SCREEN_WIDTH_PX = "375px";

const getSize = (device: "mobile" | "tv") => {
  const HEADER_HEIGHT = 68;
  const MOBILE_HEADER_HEIGHT = 48;

  const headerHeight =
    device === "mobile" ? MOBILE_HEADER_HEIGHT : HEADER_HEIGHT;
  const COMPUTED_LOGO_HEIGHT = headerHeight * 1.75;
  const COMPUTED_LOGO_WIDTH = COMPUTED_LOGO_HEIGHT * 2.15;
  const COMPUTED_DIVIDER_LEFT_SPACE = COMPUTED_LOGO_WIDTH + 8;
  return {
    HEADER_HEIGHT_PX: headerHeight + "px",
    COMPUTED_LOGO_HEIGHT_PX: COMPUTED_LOGO_HEIGHT + "px",
    COMPUTED_LOGO_WIDTH_PX: COMPUTED_LOGO_WIDTH + "px",
    COMPUTED_DIVIDER_LEFT_SPACE_PX: COMPUTED_DIVIDER_LEFT_SPACE + "px",
  };
};

export const StyledHeaderContent = styled.div`
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  padding: 0 10px;
  height: ${getSize("tv").HEADER_HEIGHT_PX};
  @media (max-width: ${MOBILE_SCREEN_WIDTH_PX}) {
    height: ${getSize("mobile").HEADER_HEIGHT_PX};
  }
`;

export const SvgContainer = styled.div<{ $hideLogo: boolean }>`
  cursor: pointer;

  opacity: ${({ $hideLogo }) => (!$hideLogo ? "1" : "0")};
  transition: ${({ $hideLogo }) =>
    !$hideLogo ? `opacity ${ANIMATION_SPEED}` : "opacity 0s"};

  svg {
    width: ${getSize("tv").COMPUTED_LOGO_WIDTH_PX};
    height: ${getSize("tv").COMPUTED_LOGO_HEIGHT_PX};

    @media (max-width: ${MOBILE_SCREEN_WIDTH_PX}) {
      width: ${getSize("mobile").COMPUTED_LOGO_WIDTH_PX};
      height: ${getSize("mobile").COMPUTED_LOGO_HEIGHT_PX};
    }
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
  min-width: 0;
  border-color: ${({ theme }) => theme.token.colorTextBase};
  border-block-start-width: 2px;
  margin: 0;
  opacity: ${({ $isDividerVisible }) => ($isDividerVisible ? "1" : "0")};
  top: ${getSize("tv").HEADER_HEIGHT_PX};
  left: ${getSize("tv").COMPUTED_DIVIDER_LEFT_SPACE_PX};
  max-width: calc(100% - ${getSize("tv").COMPUTED_DIVIDER_LEFT_SPACE_PX});
  width: ${({ $isDividerVisible }) =>
    $isDividerVisible
      ? `calc(100% - ${getSize("tv").COMPUTED_DIVIDER_LEFT_SPACE_PX})`
      : "0"};

  @media (max-width: ${MOBILE_SCREEN_WIDTH_PX}) {
    top: ${getSize("mobile").HEADER_HEIGHT_PX};
    left: ${getSize("mobile").COMPUTED_DIVIDER_LEFT_SPACE_PX};
    max-width: calc(100% - ${getSize("mobile").COMPUTED_DIVIDER_LEFT_SPACE_PX});
    width: ${({ $isDividerVisible }) =>
      $isDividerVisible
        ? `calc(100% - ${getSize("mobile").COMPUTED_DIVIDER_LEFT_SPACE_PX})`
        : "0"};
  }

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
