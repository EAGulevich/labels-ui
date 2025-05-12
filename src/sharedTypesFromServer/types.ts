import { AvatarToken } from "./avatarTokens";

export type Player = {
  id: string;
  isVip: boolean;
  name: string;
  avatarToken: AvatarToken;
};

export type Room = {
  code: string;
  status: "CREATED";
  creatorId: string;
  players: Player[];
  isInactive: boolean;
};
