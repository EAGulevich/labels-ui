import { CrownTwoTone } from "@ant-design/icons";
import { Flex } from "antd";
import styled from "styled-components";

export const PlayerItem = styled(Flex).attrs({
  vertical: true,
  justify: "center",
  align: "center",
})`
  position: relative;
`;

export const CrownIcon = styled(CrownTwoTone).attrs({
  twoToneColor: "gold",
})`
  position: absolute;
  z-index: 2;
  top: -22px;
  font-size: 28px;
`;
