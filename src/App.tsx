import {
  Button,
  ConfigProvider as AntConfigProvider,
  Result,
  theme as AntTheme,
} from "antd";
import { DarkTheme, Theme } from "./theme/theme.tsx";
import ruRU from "antd/locale/ru_RU";
import { FC, lazy, PropsWithChildren } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Routes, useNavigate } from "react-router";
import { ThemeName, useApp } from "./AppProvider.tsx";
import { ThemeSwitcher } from "./components/ThemeSwither/ThemeSwitcher.tsx";
import { FrownOutlined } from "@ant-design/icons";
import { LngSwitcher } from "./components/LngSwitcher/LngSwitcher.tsx";
import { useTranslation } from "react-i18next";

const HomeRouteComponent = lazy(() => import("./pages/Home/Home.tsx"));

export const StyledPageLayout = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: auto;
  background: ${({ theme }) => theme.token.colorBgBase};
  color: ${({ theme }) => theme.token.colorTextBase};
`;

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { token } = AntTheme.useToken();

  return (
    <ThemeProvider theme={{ token }}>
      <StyledPageLayout>{children}</StyledPageLayout>
    </ThemeProvider>
  );
};

const getThemeByName = (themeName: ThemeName) =>
  themeName === "dark" ? DarkTheme : Theme;

function App() {
  const { themeName } = useApp();

  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <AntConfigProvider theme={getThemeByName(themeName)} locale={ruRU}>
      <PageLayout>
        <div style={{ position: "absolute", right: 0, margin: "20px" }}>
          <ThemeSwitcher />
          <LngSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<HomeRouteComponent />} />
          <Route
            path="*"
            element={
              <Result
                icon={<FrownOutlined />}
                title={t("errors.404.title")}
                subTitle={t("errors.404.subTitle")}
                extra={
                  <Button type="primary" onClick={() => navigate("/")}>
                    {t("errors.404.btnTitle")}
                  </Button>
                }
              />
            }
          />
        </Routes>
      </PageLayout>
    </AntConfigProvider>
  );
}

export default App;
