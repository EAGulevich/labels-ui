import { useEffect, useRef } from "react";

import { startAnimation } from "@assets/homeLogo/_startAnimationLogo";
import LogoSvg from "@assets/homeLogo/logoForAnimation.svg?react";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";

import { ANIMATION_DELAY as AUDIO_DELAY_S, LogoWrapper } from "./styles.ts";

export const MainAnimatedLogo = () => {
  const {
    audio: { isAllAudioLoaded, allowAudio, getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  const isReady = !allowAudio || isAllAudioLoaded;
  const isMounted = useRef(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isReady && !isMounted.current) {
      isMounted.current = true;
      startAnimation();
      timerId = setTimeout(() => {
        getAudio("logoLighting").play({ userSettingsVolume: volume });
      }, 1000 * AUDIO_DELAY_S);
    }
    return () => {
      isMounted.current = false;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [getAudio, isReady, volume]);

  if (!isReady) {
    return <LogoWrapper />;
  }

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
