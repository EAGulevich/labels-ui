import { ConfigProvider, theme as AntTheme } from "antd";
import { DarkTheme, Theme } from "./theme/theme.tsx";
import ruRU from "antd/locale/ru_RU";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import { TempPage } from "./pages/Temp/Temp.tsx";
import styled, { ThemeProvider } from "styled-components";
import { Logo } from "./components/Logo/Logo.tsx";

export const StyledPageLayout = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: auto;
  background: ${({ theme }) => theme.token.colorBgBase};
  color: ${({ theme }) => theme.token.colorTextBase};
`;

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();

  return (
    <ThemeProvider theme={{ token }}>
      <StyledPageLayout>{children}</StyledPageLayout>
    </ThemeProvider>
  );
};

type ThemeName = "dark" | "light";

const getThemeByName = (themeName: ThemeName) =>
  themeName === "dark" ? DarkTheme : Theme;

function App() {
  const [theme, setTheme] = useState<ThemeName>(
    (localStorage.getItem("theme") as ThemeName) || "dark",
  );

  const changeTheme = useCallback((theme: ThemeName) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }, []);
  return (
    <ConfigProvider theme={getThemeByName(theme)} locale={ruRU}>
      <PageLayout>
        <Logo />

        <TempPage setTheme={changeTheme} checked={theme === "dark"} />
      </PageLayout>
    </ConfigProvider>
  );
}

export default App;
