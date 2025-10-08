import { theme, ThemeConfig } from "antd";

import { ThemeName } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

const commonConfig: ThemeConfig = {
  token: {
    fontSize: 20,
    sizeStep: 4,
    borderRadius: 4,
    controlHeight: 40,
  },
  components: {
    Spin: {
      dotSizeLG: 38,
    },
    Modal: {
      headerBg: "transparent",
    },
    Timeline: {
      dotBg: "transparent",
      itemPaddingBottom: 20,
    },
    Layout: {
      footerBg: "transparent",
      footerPadding: 20,
      headerBg: "transparent",
      headerPadding: 0,
      headerHeight: 68,
    },
    Card: {
      bodyPadding: 0,
    },
    Notification: {
      boxShadow: "0 0 10px 0px #eddeff45",
    },
  },
};

const DarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  ...commonConfig,
  token: {
    ...commonConfig.token,
    colorSuccess: "#23d98d",
    colorPrimary: "#9353d3",
    colorInfo: "#9353d3",
    colorWarning: "#ffca3a",
    colorError: "#ff6b6b",
    colorTextBase: "#eddeff",
    colorBgBase: "#08060a",
    colorLink: "#eddeffd9",
  },
};

const Theme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  ...commonConfig,
  token: {
    ...commonConfig.token,
  },
};

export const getThemeByName = (themeName: ThemeName) =>
  themeName === "dark" ? DarkTheme : Theme;
