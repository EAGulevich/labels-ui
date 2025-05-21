import { AvatarProps } from "antd";

import { StyledAvatar } from "@components/PlayerAvatar/styles.ts";
import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";

import { AVATARS } from "./constants.tsx";

type PlayerAvatarProps = {
  token: AvatarToken | AvatarTokenBot;
  size?: AvatarProps["size"];
};

export const PlayerAvatar = ({ token, size }: PlayerAvatarProps) => (
  <StyledAvatar
    background={AVATARS[token].background}
    size={size || "large"}
    shape={"square"}
    icon={AVATARS[token].icon}
  />
);
