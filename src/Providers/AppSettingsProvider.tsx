import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import i18n from "../i18n/config.ts";

const LOCAL_STORAGE_THEME = "theme";
const LOCAL_STORAGE_LNG = "lng";
const DEFAULT_THEME: ThemeName = "dark";

export type ThemeName = "dark" | "light";

type AppSettingsContextType = {
  themeName: ThemeName;
  changeTheme: (themeName: ThemeName) => void;
  lng: string;
  changeLng: (lng: "ru" | "en") => void;
  allowAudio?: boolean;
  setAllowAudio: (allow: boolean) => void;
};

const defaultValue: AppSettingsContextType = {
  themeName:
    (localStorage.getItem(LOCAL_STORAGE_THEME) as ThemeName) || DEFAULT_THEME,
  changeTheme: () => null,
  lng: i18n.language,
  changeLng: () => null,
  allowAudio: undefined,
  setAllowAudio: () => null,
};

const AppSettingsContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const [allowAudio, setAllowAudio] = useState<boolean | undefined>(undefined);

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

  return (
    <AppSettingsContext.Provider
      value={{
        themeName,
        changeTheme,
        lng: i18n.language,
        changeLng: i18n.changeLanguage,
        allowAudio,
        setAllowAudio,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
