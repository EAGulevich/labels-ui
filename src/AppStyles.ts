import { Layout } from "antd";
import styled, { CSSProperties } from "styled-components";

export const SLayout = styled(Layout)<{ height: CSSProperties["height"] }>`
  min-height: ${({ height }) => height};
  max-height: ${({ height }) => height};
  height: ${({ height }) => height};
`;

export const SContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;
