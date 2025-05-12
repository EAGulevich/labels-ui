import { Avatar, AvatarProps } from "antd";
import styled from "styled-components";

export const StyledAvatar = styled(Avatar)<
  AvatarProps & { background: string }
>`
  background: ${({ background }) => background};
  border: 2px solid ${({ theme }) => theme.token.colorBorder};
  padding: 2px;
`;
