export type Sound = {
  src: string;
  element: HTMLAudioElement;
  isReady: boolean;
};

export type Sounds = {
  connectPlayerAudio: Sound;
  disconnectPlayerAudio: Sound;
  itemAppearanceAudio: Sound;
  logoLightingAudio: Sound;
};
