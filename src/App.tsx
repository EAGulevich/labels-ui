import { useLocation } from "react-router";
import { ConfigProvider as AntConfigProvider, Layout } from "antd";
import styled from "styled-components";

import { Header } from "@components/Header/Header.tsx";
import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider.tsx";
import { ThemeTokenProvider } from "@providers/ThemeTokenProvider.tsx";

import { Pages } from "./pages/Pages.tsx";
import { getThemeByName } from "./theme/theme.tsx";

const StyledPageLayout = styled(Layout)`
  height: 100%;
`;

export const StyledContent = styled(Layout.Content)`
  padding: 20px;
  overflow: auto;
`;

function App() {
  const { themeName } = useAppSettings();
  const location = useLocation();

  return (
    <AntConfigProvider theme={getThemeByName(themeName)}>
      <ThemeTokenProvider>
        <StyledPageLayout>
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
