import { Flex } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Flex).attrs({
  gap: "small",
  justify: "space-between",
})`
  margin-top: auto;
`;

export const PlayersList = styled(Flex).attrs({
  justify: "center",
  wrap: true,
})`
  margin: 0 auto;
  column-gap: 20px;
  row-gap: 10px;

  > * {
    width: calc((100% - 20px * 4) / 5);
    gap: 4px;
  }
`;
