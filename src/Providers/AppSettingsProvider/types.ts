import { AvatarToken, BotAvatarToken } from "@shared/types";

export type Sound = {
  src: string;
  play: (params: {
    volume?: HTMLAudioElement["volume"];
    userSettingsVolume: number;
  }) => void;
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
  [key in BotAvatarToken]: Sound;
};
