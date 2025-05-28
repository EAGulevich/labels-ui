import { Flex } from "antd";
import styled from "styled-components";

export const GridFacts = styled.div`
  max-width: calc(100% + 40px);
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  gap: 20px;
  margin: -20px -20px 0 -20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
`;

export const FactBlock = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
  height: 100%;
  text-align: center;
  width: 100%;
  box-shadow: inset ${({ theme }) => theme.token.colorTextDescription} 0px 0px
    10px 2px;
  border-radius: 4px;
`;

export const PlayerWithFact = styled(Flex)<{
  $height: string;
  isGuessed?: boolean;
}>`
  gap: 2px;
  height: ${({ $height }) => $height};

  > * {
    transition-property: box-shadow;
    transition-duration: 1s;
    box-shadow: inset
      ${({ theme, isGuessed }) =>
        isGuessed === true
          ? theme.token.colorSuccessActive
          : isGuessed === false
            ? theme.token.colorErrorActive
            : theme.token.colorTextDescription}
      0px 0px 10px 2px;
  }
`;
