import { Badge, Card, Typography } from "antd";
import styled, { css } from "styled-components";

const VIP_BADGE_CLASS_NAME = "vip-badge";

export const Wrapper = styled.div<{ mark?: boolean }>`
  box-shadow: inset ${({ theme }) => theme.token.colorTextDescription} 0px 0px
    10px 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ mark }) =>
    mark
      ? css`
          scale: 1.1;
        `
      : ""};

  .${VIP_BADGE_CLASS_NAME} {
    > :first-child {
      vertical-align: middle;
    }
  }
`;

export const StyledPlayer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledBadge = styled(Badge.Ribbon).attrs({
  text: "VIP",
  color: "gold",
  placement: "start",
  rootClassName: VIP_BADGE_CLASS_NAME,
})<{ isVip: boolean }>`
  display: ${({ isVip }) => (isVip ? "block" : "none")};
`;

export const StyledCard = styled(Card)<{
  $isSuccess?: boolean;
  $height?: string;
}>`
  width: ${({ $height }) => $height || "110px"};
  aspect-ratio: 1 / 1;
  padding: 4px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  border-width: 4px;

  ${({ $isSuccess, theme }) =>
    $isSuccess
      ? css`
          border: 4px solid ${theme.token.colorSuccessActive};
        `
      : $isSuccess === false
        ? css`
            border: 6px solid ${theme.token.colorErrorActive};
          `
        : ""}

  > * {
    padding: 0;
  }
`;

export const PlayerName = styled(Typography.Text)`
  text-align: center;
  font-size: 16px;
`;
