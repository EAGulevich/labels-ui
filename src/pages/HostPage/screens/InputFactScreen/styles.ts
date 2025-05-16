import { Typography } from "antd";
import styled from "styled-components";

export const StyledTitle = styled(Typography.Title)`
  text-align: center;
  padding-bottom: 40px;
`;

export const Players = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 20px auto;
  gap: 20px;
  flex-wrap: wrap;
`;
