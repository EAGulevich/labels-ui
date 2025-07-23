import { Flex } from "antd";
import styled, { css } from "styled-components";

export const Wrapper = styled(Flex).attrs({
  gap: "middle",
  justify: "space-between",
})`
  margin-top: auto;
  align-items: center;
`;

export const PlayersList = styled(Flex).attrs({
  justify: "center",
  wrap: true,
  gap: "small",
})`
  margin: 0;
  width: 100%;
`;

export const PlayerItem = styled(Flex).attrs({
  align: "center",
  vertical: true,
})<{
  $isGuessed: boolean;
}>`
  width: 150px;
  transition:
    opacity 0.5s,
    scale 0.5s;
  ${({ $isGuessed }) =>
    $isGuessed
      ? css`
          scale: 0.9;
          opacity: 0.7;
        `
      : ""};
`;

export const Slashed = styled.div<{ $isGuessed: boolean }>`
  ${({ $isGuessed }) =>
    $isGuessed
      ? css`
          position: relative;
          display: inline-block;

          &::after {
            content: "";
            position: absolute;
            left: -12px;
            top: 50%;
            width: 150%;
            height: 4px;
            background: ${({ theme }) => theme.token.colorTextSecondary};
            transform: rotate(-30deg);
          }
        `
      : ""}
`;
