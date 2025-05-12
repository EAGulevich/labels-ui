import { StyledAvatar } from "@components/PlayerAvatar/styles.ts";
import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";

import { AVATARS } from "./constants.tsx";

type PlayerAvatarProps = {
  token: AvatarToken | AvatarTokenBot;
};

export const PlayerAvatar = ({ token }: PlayerAvatarProps) => (
  <StyledAvatar
    background={AVATARS[token].background}
    size={"large"}
    shape={"square"}
    icon={AVATARS[token].icon}
  />
);
