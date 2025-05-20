import { Sounds } from "@providers/AppSettingsProvider/types.ts";

export const DEFAULT_SOUNDS: Sounds = {
  connectPlayer: {
    src: "sounds/connectPlayer.mp3",
    play: () => null,
    isReady: false,
  },
  disconnectPlayer: {
    src: "sounds/disconnectPlayer.mp3",
    play: () => null,
    isReady: false,
  },
  itemHover: {
    src: "sounds/itemAppearance.mp3",
    play: () => null,
    isReady: false,
  },
  logoLighting: {
    src: "sounds/logoLighting.mp3",
    play: () => null,
    isReady: false,
  },
};
