import { FC, PropsWithChildren } from "react";
import { theme as AntTheme } from "antd";
import { ThemeProvider } from "styled-components";

export const ThemeTokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();

  return <ThemeProvider theme={{ token }}>{children}</ThemeProvider>;
};
