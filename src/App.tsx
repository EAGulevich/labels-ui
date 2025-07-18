import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ConfigProvider as AntConfigProvider, Layout } from "antd";

import { Header } from "@components/Header/Header.tsx";
import { FOOTER_CONTENT, ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { ThemeTokenProvider } from "@providers/ThemeTokenProvider.tsx";

import { ResolutionWarning } from "./pages/HostPage/parts/ResolutionWarning.tsx";
import { Pages } from "./pages/Pages.tsx";
import { getThemeByName } from "./theme/theme.tsx";
import { SContent, SLayout, StickyHeader } from "./AppStyles.ts";

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
        <SLayout height={layoutHeight + "px"}>
          <StickyHeader>
            <Header hasOnlyMenu={location.pathname === ROUTE_PATHS.home} />
          </StickyHeader>
          <ResolutionWarning />
          <Layout.Footer id={FOOTER_CONTENT} />
          <SContent>
            <Pages />
          </SContent>
        </SLayout>
      </ThemeTokenProvider>
    </AntConfigProvider>
  );
}

export default App;
