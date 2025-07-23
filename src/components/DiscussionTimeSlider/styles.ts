import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const InfoIcon = styled(InfoCircleOutlined)`
  color: ${({ theme }) => theme.token.colorTextSecondary};

  &:hover {
    color: ${({ theme }) => theme.token.colorTextBase};
  }
`;
