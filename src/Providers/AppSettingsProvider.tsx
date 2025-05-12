import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { DEFAULT_THEME } from "@constants";

export type ThemeName = "dark" | "light";

type AppSettingsContextType = {
  themeName: ThemeName;
  changeTheme: (themeName: ThemeName) => void;
};

const defaultValue: AppSettingsContextType = {
  themeName: "dark",
  changeTheme: () => null,
};

const AppSettingsContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeName, setTheme] = useState<ThemeName>(
    (localStorage.getItem("theme") as ThemeName) || DEFAULT_THEME,
  );

  const changeTheme = useCallback((theme: ThemeName) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }, []);

  return (
    <AppSettingsContext.Provider
      value={{
        themeName,
        changeTheme,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
