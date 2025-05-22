import { QuestionOutlined } from "@ant-design/icons";
import { AvatarProps } from "antd";
import { useTheme } from "styled-components";

import { StyledAvatar } from "@components/PlayerAvatar/styles.ts";
import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";

import { AVATARS } from "./constants.tsx";

type PlayerAvatarProps = {
  token?: AvatarToken | AvatarTokenBot;
  size?: AvatarProps["size"];
};

export const PlayerAvatar = ({ token, size }: PlayerAvatarProps) => {
  const { token: colorToken } = useTheme();
  return (
    <StyledAvatar
      background={token ? AVATARS[token].background : "transparent"}
      size={size || "large"}
      shape={"square"}
      icon={
        token ? (
          AVATARS[token].icon
        ) : (
          <QuestionOutlined style={{ color: colorToken.colorTextBase }} />
        )
      }
    />
  );
};
