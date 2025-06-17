import styled from "styled-components";

export const FlexItem = styled.div`
  display: flex;
  flex: 0 0 30%;
  align-items: center;
  justify-content: center;
`;

export const AvatarItem = styled.div<{ selected: boolean; disabled: boolean }>`
  padding: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 4px;
  border: 2px solid
    ${({ theme, selected }) =>
      selected ? theme.token.colorTextSecondary : "transparent"};
  background: ${({ theme, selected }) =>
    selected ? theme.token.colorTextSecondary : "transparent"};

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;
