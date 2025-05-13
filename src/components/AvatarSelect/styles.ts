import { Avatar, Button } from "antd";
import styled from "styled-components";

export const MENU_AVATARS_LIST_CLASS = "avatarsList";

export const SAvatarDropdownOverlay = styled.div`
  .${MENU_AVATARS_LIST_CLASS} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const StyledAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-color: ${({ theme }) => theme.token.colorBorder};
  color: ${({ theme }) => theme.token.colorBorder};
`;

export const StyledButton = styled(Button)`
  &:focus,
  &:active,
  &:hover {
    ${StyledAvatar} {
      border-color: ${({ theme }) => theme.token.colorPrimaryHover};
      color: ${({ theme }) => theme.token.colorPrimaryHover};
    }
  }
`;
