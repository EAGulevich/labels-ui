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

const calcVolume = ({
  audioVolume,
  userVolume,
}: {
  audioVolume: number;
  userVolume: number;
}): number => {
  let ratio = 0.1;

  switch (userVolume) {
    case 5: {
      ratio = 1;
      break;
    }
    case 4: {
      ratio = 0.7;
      break;
    }
    case 3: {
      ratio = 0.45;
      break;
    }
    case 2: {
      ratio = 0.2;
      break;
    }
    case 1:
    default: {
      ratio = 0.05;
      break;
    }
  }

  return audioVolume * ratio;
};

const createAudioPromise = (name: keyof Sounds, sound: Sound) => {
  return new Promise<{ name: keyof Sounds; sound: Sound }>(
    (resolve, reject) => {
      const audioFile = new Audio(sound.src);

      audioFile.onerror = () => {
        reject(sound);
      };

      audioFile.addEventListener("canplaythrough", () => {
        resolve({
          name,
          sound: {
            ...sound,
            play: ({ volume = 1, userSettingsVolume }) => {
              const clonedAudio = audioFile.cloneNode() as typeof audioFile;
              clonedAudio.volume = calcVolume({
                audioVolume: volume,
                userVolume: userSettingsVolume,
              });
              clonedAudio.play();
            },
            isReady: true,
          },
        });
      });
    },
  );
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
