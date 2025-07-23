import { Layout } from "antd";
import styled, { css, CSSProperties } from "styled-components";

import { TV_HEIGHT, TV_WIDTH } from "@constants";

const tvStyles = css`
  transform-origin: center;
  overflow: hidden;
  width: ${TV_WIDTH}px;
  max-width: ${TV_WIDTH}px;
  height: ${TV_HEIGHT}px;
  max-height: ${TV_HEIGHT}px;
  flex-shrink: 0;
  align-self: center;
`;

export const PlatformWrapper = styled.div<{
  $isTV: boolean;
  height: CSSProperties["height"];
}>`
  height: ${({ height }) => height};
  max-height: ${({ height }) => height};
  width: 100%;

  ${({ $isTV }) =>
    $isTV
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `
      : ""};
`;

export const SLayout = styled(Layout)<{
  $isTV: boolean;
}>`
  height: 100%;
  overflow: auto;

  ${({ $isTV }) => ($isTV ? tvStyles : "")};
  ${css`
    background-image:
      radial-gradient(
        at 73.63212897415752% 94.52411922515105%,
        ${({ theme }) => theme.token.colorBgBase},
        hsla(0, 0%, 0%, 0) 100%
      ),
      radial-gradient(
        at 57.0262155245264% 13.658301327070333%,
        ${({ theme }) => theme.token.colorPrimary},
        hsla(269.09090909090907, 42.857142857142854%, 15.098039215686276%, 0)
          100%
      ),
      radial-gradient(
        at 10.043043622088154% 53.04478478439167%,
        ${({ theme }) => theme.token.colorBgBase},
        hsla(0, 0%, 0%, 0) 100%
      ),
      radial-gradient(
        at 65.34567280277811% 47.922926888350695%,
        ${({ theme }) => theme.token.colorPrimary},
        hsla(269.09090909090907, 42.857142857142854%, 15.098039215686276%, 0)
          100%
      ),
      radial-gradient(
        at 1.2569399619570265% 71.62507214937902%,
        ${({ theme }) => theme.token.colorBgBase},
        hsla(0, 0%, 0%, 0) 100%
      ),
      radial-gradient(
        at 79.41670057059821% 80.56361010925406%,
        ${({ theme }) => theme.token.colorPrimary},
        hsla(269.09090909090907, 42.857142857142854%, 15.098039215686276%, 0)
          100%
      ),
      radial-gradient(
        at 31.624424512962136% 25.37564051439414%,
        ${({ theme }) => theme.token.colorBgBase},
        hsla(0, 0%, 0%, 0) 100%
      ),
      radial-gradient(
        at 9.878368197590126% 36.2049372396285%,
        ${({ theme }) => theme.token.colorPrimary},
        hsla(269.09090909090907, 42.857142857142854%, 15.098039215686276%, 0)
          100%
      );
  `}
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
