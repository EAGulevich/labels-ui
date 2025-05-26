import { Flex } from "antd";
import styled from "styled-components";

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
  margin: 0 auto;
  gap: 8px;

  > * {
    width: calc((100% - 8px * 4) / 5);
    gap: 4px;
  }
`;
