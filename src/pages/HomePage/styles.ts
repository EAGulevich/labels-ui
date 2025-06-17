import { Alert, Flex } from "antd";
import styled from "styled-components";

export const AudioAlert = styled(Alert)`
  margin: 0 auto;
`;

export const AudioAlertAction = styled(Flex).attrs({
  vertical: true,
  gap: "small",
})`
  margin-left: 12px;
`;
