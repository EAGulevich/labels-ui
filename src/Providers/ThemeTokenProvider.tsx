import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router";
import { theme as AntTheme } from "antd";
import { ThemeProvider } from "styled-components";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const ThemeTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();
  const { pathname } = useLocation();

  const {
    theme: { themeName },
  } = useAppSettings();

  useEffect(() => {
    const isTV = pathname === "/room";
    document.body.style.backgroundColor = isTV ? "black" : token.colorBgLayout;
  }, [pathname, token.colorBgLayout]);

  return <ThemeProvider theme={{ token, themeName }}>{children}</ThemeProvider>;
};
