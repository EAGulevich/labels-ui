import { Tag } from "antd";
import styled from "styled-components";

export const TITLE_CLASS_NAME = "remove-title-spacing";

export const StyledBlock = styled.div`
  > h1.${TITLE_CLASS_NAME},
    h2.${TITLE_CLASS_NAME},
    h3.${TITLE_CLASS_NAME},
    h4.${TITLE_CLASS_NAME},
    h5.${TITLE_CLASS_NAME} {
    margin: 10px 0;
  }
  margin: 0 0 20px;
  text-align: center;
`;

export const StyledTag = styled(Tag)`
  font-size: inherit;
  padding: 10px;
`;
