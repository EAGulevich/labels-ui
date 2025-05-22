import styled from "styled-components";

export const GridFacts = styled.div`
  max-width: calc(100% + 40px);
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  gap: 20px;
  margin: -20px -20px 0 -20px;
  padding: 20px;
  overflow: hidden;
`;

export const FactBlock = styled.div`
  max-width: 100%;
  margin: 0 auto;
  height: 110px;
  padding: 20px;
  text-align: center;
  width: 100%;
  box-shadow: inset ${({ theme }) => theme.token.colorTextDescription} 0px 0px
    10px 2px;
  border-radius: 4px;
`;
