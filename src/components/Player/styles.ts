import { Badge, Card } from "antd";
import styled, { css } from "styled-components";

const VIP_BADGE_CLASS_NAME = "vip-badge";

export const Wrapper = styled.div`
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

export const StyledCard = styled(Card)<{ isSuccess: boolean }>`
  width: 110px;
  aspect-ratio: 1 / 1;
  padding: 0;
  display: flex;
  justify-content: center;

  ${({ isSuccess }) =>
    isSuccess
      ? css`
          border-color: ${({ theme }) => theme.token.colorSuccessBorder};
          border-width: 2px;
        `
      : ""}

  > * {
    padding: 0;
  }
`;
