import { theme, ThemeConfig } from "antd";

const commonConfig: ThemeConfig = {
  token: {
    fontSize: 14,
    sizeStep: 4,
    borderRadius: 4,
  },
  components: {},
};

export const DarkTheme: ThemeConfig = {
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
    // TODO: не черный
    colorBgBase: "#000",
    // colorBgElevated: "#100017",
    colorLink: "#eddeffd9",
  },
};

export const Theme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  ...commonConfig,
  token: {
    ...commonConfig.token,
    colorSuccess: "#23d98d",
    colorPrimary: "#9353d3",
    colorInfo: "#9353d3",
    colorWarning: "#ffca3a",
    colorError: "#ff6b6b",
    colorTextBase: "#1b1526",
    // colorBgBase: "#f2e8ff",
    colorLink: "1b1526e0",
  },
};
