import { Badge, Card } from "antd";
import styled, { css } from "styled-components";

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
