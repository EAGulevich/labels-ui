import { Layout } from "antd";
import styled from "styled-components";

export const StyledPageLayout = styled(Layout)<{ height: string }>`
  min-height: ${({ height }) => height};
  max-height: ${({ height }) => height};
`;

export const StyledContent = styled(Layout.Content)`
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledFooter = styled(Layout.Footer)`
  padding: 0 20px;
  background: transparent;
`;
