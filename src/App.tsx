import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ConfigProvider as AntConfigProvider, Layout } from "antd";
import styled from "styled-components";

import { Header } from "@components/Header/Header.tsx";
import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { ThemeTokenProvider } from "@providers/ThemeTokenProvider.tsx";

import { Pages } from "./pages/Pages.tsx";
import { getThemeByName } from "./theme/theme.tsx";

const StyledPageLayout = styled(Layout)<{ height: string }>`
  min-height: ${({ height }) => height};
  max-height: ${({ height }) => height};
`;

export const StyledContent = styled(Layout.Content)`
  padding: 20px;
  overflow: auto;
`;

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
        <StyledPageLayout height={layoutHeight + "px"}>
          <Header onlyMenuButton={location.pathname === ROUTE_PATHS.home} />
          <StyledContent>
            <Pages />
          </StyledContent>
        </StyledPageLayout>
      </ThemeTokenProvider>
    </AntConfigProvider>
  );
}

export default App;
