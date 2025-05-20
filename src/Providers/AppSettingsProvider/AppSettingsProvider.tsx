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
import { Sounds } from "./types.ts";
import { useSoundPlayer } from "./useSoundPlayer.tsx";

const LOCAL_STORAGE_THEME = "theme";
const LOCAL_STORAGE_LNG = "lng";
const DEFAULT_THEME: ThemeName = "dark";

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
    audios: Sounds;
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
    isAllAudioLoaded: false,
    audios: DEFAULT_SOUNDS,
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
  const [audios, setAudios] = useState<Sounds>(DEFAULT_SOUNDS);

  const [themeName, setTheme] = useState<ThemeName>(
    (localStorage.getItem(LOCAL_STORAGE_THEME) as ThemeName) || DEFAULT_THEME,
  );

  const changeTheme = useCallback((theme: ThemeName) => {
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
    setTheme(theme);
  }, []);

  useEffect(() => {
    const localStorageLng = localStorage.getItem(LOCAL_STORAGE_LNG);
    if (localStorageLng !== i18n.language) {
      localStorage.setItem(LOCAL_STORAGE_LNG, i18n.language);
    }
  }, [i18n.language]);

  useSoundPlayer({
    allowAudio,
    setIsAllAudioLoaded,
    isAllAudioLoadingStarted,
    setAudios,
    audios,
  });

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
          audios,
        },
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
