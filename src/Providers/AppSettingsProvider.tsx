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

import {
  DEFAULT_LNG,
  DEFAULT_THEME,
  LOCAL_STORAGE_LNG,
  LOCAL_STORAGE_THEME,
} from "@constants";

export type ThemeName = "dark" | "light";

type AppSettingsContextType = {
  themeName: ThemeName;
  changeTheme: (themeName: ThemeName) => void;
  lng: string;
  changeLng: (lng: "ru" | "en") => void;
};

const defaultValue: AppSettingsContextType = {
  themeName: DEFAULT_THEME,
  changeTheme: () => null,
  lng: DEFAULT_LNG,
  changeLng: () => null,
};

const AppSettingsContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
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
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
