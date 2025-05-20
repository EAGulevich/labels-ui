import { Sounds } from "@providers/AppSettingsProvider/types.ts";

export const DEFAULT_SOUNDS: Sounds = {
  connectPlayerAudio: {
    src: "sounds/connectPlayer.mp3",
    element: new Audio(undefined),
    isReady: false,
  },
  disconnectPlayerAudio: {
    src: "sounds/disconnectPlayer.mp3",
    element: new Audio(undefined),
    isReady: false,
  },
  itemAppearanceAudio: {
    src: "sounds/itemAppearance.mp3",
    element: new Audio(undefined),
    isReady: false,
  },
  logoLightingAudio: {
    src: "sounds/logoLighting.mp3",
    element: new Audio(undefined),
    isReady: false,
  },
};
