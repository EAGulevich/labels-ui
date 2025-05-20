import { useEffect } from "react";

import { startAnimation } from "@assets/homeLogo/_startAnimationLogo";
import LogoSvg from "@assets/homeLogo/logoForAnimation.svg?react";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

import { ANIMATION_DELAY as AUDIO_DELAY_S, LogoWrapper } from "./styles.ts";

export const MainAnimatedLogo = () => {
  const {
    audio: { isAllAudioLoaded, allowAudio, getAudio },
  } = useAppSettings();
  const isReady = !allowAudio || isAllAudioLoaded;

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isReady) {
      startAnimation();
      timerId = setTimeout(() => {
        getAudio("logoLighting").play({ volume: 0.5 });
      }, 1000 * AUDIO_DELAY_S);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [getAudio, isReady]);

  if (!isReady) {
    return <LogoWrapper />;
  }

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
