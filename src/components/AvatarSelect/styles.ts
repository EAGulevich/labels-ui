import styled from "styled-components";

export const MENU_AVATARS_LIST_CLASS = "avatarsList";

export const SAvatarDropdownOverlay = styled.div`
  .${MENU_AVATARS_LIST_CLASS} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
