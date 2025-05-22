import { Flex } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Flex).attrs({
  gap: "small",
  justify: "space-between",
})`
  margin-top: auto;
`;

export const PlayersList = styled(Flex).attrs({
  gap: "small",
  justify: "center",
  wrap: true,
})`
  margin: 0 auto;
`;
