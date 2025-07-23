import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n/config.ts";
import { DEFAULT_SOUNDS } from "./constants.ts";
import { Sound, Sounds } from "./types.ts";
import { useSoundPlayer } from "./useSoundPlayer.tsx";

const LOCAL_STORAGE_THEME = "theme";
const LOCAL_STORAGE_LNG = "lng";
const LOCAL_STORAGE_DISCUSSION_TIME_S = "voteTime";

const DEFAULT_THEME: ThemeName = "dark";
const DEFAULT_VOTE_TIME = 100;

export type ThemeName = "dark" | "light";

type AppSettingsContextType = {
  theme: {
    themeName: ThemeName;
    changeTheme: (themeName: ThemeName) => void;
  };
  language: {
    lng: string;
    changeLng: (lng: "ru" | "en") => void;
  };
  audio: {
    allowAudio?: boolean;
    setAllowAudio: (allow: boolean) => void;
    isAllAudioLoaded: boolean;
    loadedAudiosProgress: number;
    getAudio: (name: keyof Sounds) => Sound;
  };
  discussion: {
    discussionTime: number;
    changeDiscussionTime: (time: number) => void;
  };
};

const defaultValue: AppSettingsContextType = {
  theme: {
    themeName:
      (localStorage.getItem(LOCAL_STORAGE_THEME) as ThemeName) || DEFAULT_THEME,
    changeTheme: () => null,
  },
  language: {
    lng: i18n.language,
    changeLng: () => null,
  },
  audio: {
    allowAudio: undefined,
    setAllowAudio: () => null,
    loadedAudiosProgress: 0,
    isAllAudioLoaded: false,
    getAudio: (name: keyof Sounds) => DEFAULT_SOUNDS[name],
  },
  discussion: {
    discussionTime: +(
      localStorage.getItem(LOCAL_STORAGE_DISCUSSION_TIME_S) || DEFAULT_VOTE_TIME
    ),
    changeDiscussionTime: () => null,
  },
};

const AppSettingsContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const [allowAudio, setAllowAudio] = useState<boolean | undefined>(undefined);
  const [isAllAudioLoaded, setIsAllAudioLoaded] = useState(false);
  const isAllAudioLoadingStarted = useRef(false);
  const audiosRef = useRef<Sounds>(DEFAULT_SOUNDS);
  const [discussionTime, setDiscussionTime] = useState(
    +(
      localStorage.getItem(LOCAL_STORAGE_DISCUSSION_TIME_S) || DEFAULT_VOTE_TIME
    ),
  );

  const [themeName, setTheme] = useState<ThemeName>(
    (localStorage.getItem(LOCAL_STORAGE_THEME) as ThemeName) || DEFAULT_THEME,
  );

  const changeTheme = useCallback((theme: ThemeName) => {
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
    setTheme(theme);
  }, []);

  const changeDiscussionTime = useCallback((time: number) => {
    localStorage.setItem(LOCAL_STORAGE_DISCUSSION_TIME_S, time.toString());
    setDiscussionTime(time);
  }, []);

  useEffect(() => {
    const localStorageLng = localStorage.getItem(LOCAL_STORAGE_LNG);
    if (localStorageLng !== i18n.language) {
      localStorage.setItem(LOCAL_STORAGE_LNG, i18n.language);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (allowAudio === false) {
      audiosRef.current = DEFAULT_SOUNDS;
    }
  }, [allowAudio]);

  const { loadedAudiosCount } = useSoundPlayer({
    allowAudio,
    setIsAllAudioLoaded,
    isAllAudioLoadingStarted,
    setAudios: (sounds: Sounds) => {
      audiosRef.current = sounds;
    },
    audios: audiosRef.current,
  });

  const getAudio = useCallback(
    (name: keyof Sounds) => audiosRef.current[name],
    [],
  );

  return (
    <AppSettingsContext.Provider
      value={{
        theme: {
          themeName,
          changeTheme,
        },
        language: {
          lng: i18n.language,
          changeLng: i18n.changeLanguage,
        },
        audio: {
          allowAudio,
          setAllowAudio,
          isAllAudioLoaded,
          loadedAudiosProgress: Math.floor(
            (loadedAudiosCount / Object.keys(DEFAULT_SOUNDS).length) * 100,
          ),
          getAudio,
        },
        discussion: {
          discussionTime: discussionTime,
          changeDiscussionTime: changeDiscussionTime,
        },
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
