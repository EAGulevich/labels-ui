import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ConfigProvider as AntConfigProvider } from "antd";

import { Header } from "@components/Header/Header.tsx";
import { FOOTER_CONTENT, ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { GameStateProvider } from "@providers/GameStateProvider.tsx";
import { ThemeTokenProvider } from "@providers/ThemeTokenProvider.tsx";

import { Pages } from "./pages/Pages.tsx";
import { getThemeByName } from "./theme/theme.tsx";
import { StyledContent, StyledFooter, StyledPageLayout } from "./AppStyles.ts";

function App() {
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const {
    theme: { themeName },
  } = useAppSettings();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setLayoutHeight(window.innerHeight);
    });
  }, []);

  return (
    <AntConfigProvider theme={getThemeByName(themeName)}>
      <ThemeTokenProvider>
        <GameStateProvider>
          <StyledPageLayout height={layoutHeight + "px"}>
            <Header onlyMenuButton={location.pathname === ROUTE_PATHS.home} />
            <StyledFooter id={FOOTER_CONTENT} />
            <StyledContent>
              <Pages />
            </StyledContent>
          </StyledPageLayout>
        </GameStateProvider>
      </ThemeTokenProvider>
    </AntConfigProvider>
  );
}

export default App;
