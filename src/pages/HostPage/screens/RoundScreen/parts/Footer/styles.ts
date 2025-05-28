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
})`
  margin: 0;
  width: 100%;
  gap: 8px;

  > * {
    width: calc((100% - 8px * 4) / 5);
    gap: 4px;
  }
`;

export const PlayerItem = styled(Flex).attrs({ align: "center" })<{
  isGuessed: boolean;
}>`
  ${({ isGuessed }) =>
    isGuessed
      ? css`
          opacity: 0.5;
        `
      : ""};
`;
