import { RefObject, useEffect, useRef } from "react";

import { DEFAULT_SOUNDS } from "@providers/AppSettingsProvider/constants.ts";
import { Sound, Sounds } from "@providers/AppSettingsProvider/types.ts";

type UseSoundPlayerProps = {
  allowAudio?: boolean;
  setIsAllAudioLoaded: (isLoaded: boolean) => void;
  isAllAudioLoadingStarted?: RefObject<boolean>;
  audios: Sounds;
  setAudios: (audios: Sounds) => void;
};

const createAudioPromise = (name: keyof Sounds, sound: Sound) => {
  return new Promise<{ name: keyof Sounds; sound: Sound }>((resolve) => {
    const audioFile = new Audio(sound.src);

    audioFile.addEventListener("canplaythrough", () => {
      resolve({
        name,
        sound: {
          ...sound,
          play: ({ volume = 1 }) => {
            const clonedAudio = audioFile.cloneNode() as typeof audioFile;
            clonedAudio.volume = volume;
            clonedAudio.play();
          },
          isReady: true,
        },
      });
    });
  });
};

export const useSoundPlayer = ({
  allowAudio,
  setIsAllAudioLoaded,
  isAllAudioLoadingStarted,
  setAudios,
  audios,
}: UseSoundPlayerProps) => {
  const loadedAudiosRef = useRef<Sounds>(DEFAULT_SOUNDS);

  useEffect(() => {
    const isNeedLoad =
      allowAudio && isAllAudioLoadingStarted?.current === false;

    if (isNeedLoad) {
      isAllAudioLoadingStarted.current = true;

      const audioPromises = Object.entries(audios).map(([name, sound]) => {
        return createAudioPromise(name as keyof Sounds, sound);
      });

      Promise.all(audioPromises)
        .then((audiosResponse) => {
          console.log("Все аудио элементы готовы к воспроизведению:", audios);
          const newAudios: Sounds = { ...audios };

          audiosResponse.forEach((audio) => {
            newAudios[audio.name] = audio.sound;
          });

          setAudios(newAudios);
          setIsAllAudioLoaded(true);
          loadedAudiosRef.current = newAudios;
        })
        .catch((error) => {
          console.error("Ошибка при загрузке аудио:", error);
        });
    } else if (allowAudio) {
      setAudios(loadedAudiosRef.current);
    }
  }, [
    allowAudio,
    audios,
    isAllAudioLoadingStarted,
    setAudios,
    setIsAllAudioLoaded,
  ]);
};
