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
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(false);

  const logoSound = getAudio("logoLighting");

  useEffect(() => {
    const timerId = timerIdRef.current;
    if (isReady && !isMountedRef.current) {
      isMountedRef.current = true;
      startAnimation();
      timerIdRef.current = setTimeout(() => {
        logoSound.play({ userSettingsVolume: volume });
      }, 1000 * AUDIO_DELAY_S);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isReady, logoSound, volume]);

  if (!isReady) {
    return <LogoWrapper />;
  }

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
