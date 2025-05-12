import { Avatar } from "antd";
import { AVATARS } from "./constants.tsx";
import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";

export const PlayerAvatar = ({
  token,
}: {
  token: AvatarToken | AvatarTokenBot;
}) => (
  <Avatar
    size={"large"}
    shape={"square"}
    icon={AVATARS[token].icon}
    style={{
      background: AVATARS[token].background,
      border: "1px solid white",
      padding: "2px",
    }}
  />
);
