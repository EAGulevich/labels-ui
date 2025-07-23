import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router";
import { theme as AntTheme } from "antd";
import { ThemeProvider } from "styled-components";

export const ThemeTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();
  const { pathname } = useLocation();

  useEffect(() => {
    const isTV = pathname === "/room";
    document.body.style.backgroundColor = isTV ? "black" : token.colorBgLayout;
  }, [pathname, token.colorBgLayout]);

  return <ThemeProvider theme={{ token }}>{children}</ThemeProvider>;
};
