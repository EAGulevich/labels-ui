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
          scale: 0.8;
          opacity: 0.8;
        `
      : ""};
`;
