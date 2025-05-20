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
  attention: {
    src: "sounds/attention.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_BOT: {
    src: "sounds/robots/ready/waiting.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_1: {
    src: "sounds/robots/ready/reacted.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_2: {
    src: "sounds/robots/ready/okey.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_3: {
    src: "sounds/robots/ready/sent.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_4: {
    src: "sounds/robots/ready/ready.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_5: {
    src: "sounds/robots/ready/executed.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_6: {
    src: "sounds/robots/ready/answered.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_7: {
    src: "sounds/robots/ready/finalized.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_8: {
    src: "sounds/robots/ready/done.mp3",
    play: () => null,
    isReady: false,
  },

  ROBOT_9: {
    src: "sounds/robots/ready/finished.mp3",
    play: () => null,
    isReady: false,
  },
};
