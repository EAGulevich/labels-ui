import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";

export type Sound = {
  src: string;
  play: (params?: { volume?: HTMLAudioElement["volume"] }) => void;
  isReady: boolean;
};

export type Sounds = {
  connectPlayer: Sound;
  disconnectPlayer: Sound;
  itemHover: Sound;
  logoLighting: Sound;
  attention: Sound;
} & {
  [key in AvatarToken]: Sound;
} & {
  [key in AvatarTokenBot]: Sound;
};
