import { useEffect, useRef, useState } from "react";

import { startAnimation } from "@assets/homeLogo/_startAnimationLogo";
import LogoSvg from "@assets/homeLogo/logoForAnimation.svg?react";
import audioSrc from "@assets/sounds/logoLighting.mp3";
import { useAppSettings } from "@providers/AppSettingsProvider.tsx";

import { ANIMATION_DELAY as AUDIO_DELAY_S, LogoWrapper } from "./styles.ts";

export const MainAnimatedLogo = () => {
  const [isReady, setIsReady] = useState(false);
  const { allowAudio } = useAppSettings();

  const audio = useRef(allowAudio ? new Audio(audioSrc) : null);

  useEffect(() => {
    const audioRef = audio.current;
    const onAudioLoaded = () => {
      setIsReady(true);
    };

    if (!audioRef) {
      setIsReady(true);
    } else {
      audioRef.addEventListener("canplaythrough", onAudioLoaded);
    }
    return () => {
      if (audioRef) {
        audioRef.removeEventListener("canplaythrough", onAudioLoaded);
      }
    };
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    const audioRef = audio.current;
    if (isReady) {
      startAnimation();
      timerId = setTimeout(() => {
        if (audioRef) {
          audioRef.volume = 0.5;
          audioRef.play();
        }
      }, 1000 * AUDIO_DELAY_S);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isReady]);

  if (!isReady) {
    return <LogoWrapper />;
  }

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
