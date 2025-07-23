import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ConfigProvider as AntConfigProvider, Layout } from "antd";

import { Header } from "@components/Header/Header.tsx";
import {
  FOOTER_CONTENT,
  LAYOUT_ID,
  ROUTE_PATHS,
  TV_HEIGHT,
  TV_WIDTH,
} from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { ThemeTokenProvider } from "@providers/ThemeTokenProvider.tsx";

import { Pages } from "./pages/Pages.tsx";
import { getThemeByName } from "./theme/theme.tsx";
import {
  PlatformWrapper,
  SContent,
  SLayout,
  StickyHeader,
} from "./AppStyles.ts";

function App() {
  const platformRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isTV = pathname === "/room";
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

  useLayoutEffect(() => {
    const platformContainer = platformRef.current;
    function scaleApp() {
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;

      const scaleX = windowWidth / TV_WIDTH;
      const scaleY = windowHeight / TV_HEIGHT;
      const scale = isTV ? Math.min(scaleX, scaleY) : 1;

      if (platformContainer) {
        platformContainer.style.transform = `scale(${scale})`;
      }
    }

    scaleApp();
    window.addEventListener("resize", scaleApp);

    return () => {
      window.removeEventListener("resize", scaleApp);
    };
  }, [isTV]);

  return (
    <AntConfigProvider theme={getThemeByName(themeName)}>
      <ThemeTokenProvider>
        <PlatformWrapper height={layoutHeight + "px"} $isTV={isTV}>
          <SLayout $isTV={isTV} id={LAYOUT_ID} ref={platformRef}>
            <StickyHeader>
              <Header hasOnlyMenu={location.pathname === ROUTE_PATHS.home} />
            </StickyHeader>
            <Layout.Footer id={FOOTER_CONTENT} />
            <SContent>
              <Pages />
            </SContent>
          </SLayout>
        </PlatformWrapper>
      </ThemeTokenProvider>
    </AntConfigProvider>
  );
}

export default App;
