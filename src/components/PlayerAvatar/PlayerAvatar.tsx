import { Avatar } from "antd";
import { PlayerAvatarProps } from "./types.ts";
import { AVATARS } from "./constants.tsx";

export const PlayerAvatar = ({ token }: PlayerAvatarProps) => (
  <Avatar
    size={"large"}
    icon={AVATARS[token].icon}
    style={{
      background: AVATARS[token].background,
      border: "1px solid white",
      padding: "2px",
    }}
  />
);
