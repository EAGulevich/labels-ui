import { Tag, Typography } from "antd";
import styled from "styled-components";

export const StyledTitle = styled(Typography.Title).attrs({
  style: {
    margin: 0,
    textAlign: "center",
  },
})``;

export const StyledTag = styled(Tag)`
  font-size: inherit;
  padding: 20px;
`;
