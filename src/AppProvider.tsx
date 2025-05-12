import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export type ThemeName = "dark" | "light";

type AppContextType = {
  themeName: ThemeName;
  changeTheme: (themeName: ThemeName) => void;
};

const defaultValue: AppContextType = {
  themeName: "dark",
  changeTheme: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeName, setTheme] = useState<ThemeName>(
    (localStorage.getItem("theme") as ThemeName) || "dark",
  );

  const changeTheme = useCallback((theme: ThemeName) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }, []);

  return (
    <AppContext.Provider
      value={{
        themeName,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
