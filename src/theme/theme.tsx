import { theme, ThemeConfig } from "antd";

import { ThemeName } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

const commonConfig: ThemeConfig = {
  token: {
    fontSize: 14,
    sizeStep: 4,
    borderRadius: 4,
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
      footerPadding: 0,
      headerBg: "transparent",
      headerPadding: 0,
      headerHeight: 48,
    },
    Card: {
      bodyPadding: 0,
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
