import { FC, PropsWithChildren, useEffect } from "react";
import { theme as AntTheme } from "antd";
import { ThemeProvider } from "styled-components";

export const ThemeTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgLayout;
  }, [token.colorBgLayout]);

  return <ThemeProvider theme={{ token }}>{children}</ThemeProvider>;
};
