import { FC, lazy, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider as AntConfigProvider,
  Layout,
  Result,
  theme as AntTheme,
} from "antd";
import ruRU from "antd/locale/ru_RU";
import styled, { ThemeProvider } from "styled-components";

import { Header } from "@components/Header/Header.tsx";

import { DarkTheme, Theme } from "./theme/theme.tsx";
import { ThemeName, useApp } from "./AppProvider.tsx";

// TODO: creator -> host

const HomeRouteComponent = lazy(() => import("./pages/HomePage/HomePage.tsx"));

const CreateRoomRouteComponent = lazy(
  () => import("./pages/HostPage/HostPage.tsx"),
);

const JoinRouteComponent = lazy(
  () => import("./pages/PlayerPage/PlayerPage.tsx"),
);

const StyledPageLayout = styled(Layout)`
  min-height: 100vh;
  max-height: 100vh;

  min-width: 100vw;
  max-width: 100vw;

  overflow: auto;
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

export const StyledContent = styled(Layout.Content)`
  padding: 40px 20px;
`;

function App() {
  const { themeName } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <AntConfigProvider theme={getThemeByName(themeName)} locale={ruRU}>
      <PageLayout>
        <Header hideLogo={location.pathname === "/"} />
        <StyledContent>
          <Routes>
            <Route path="/" element={<HomeRouteComponent />} />
            <Route path="/new" element={<CreateRoomRouteComponent />} />
            <Route path="/join" element={<JoinRouteComponent />} />
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
        </StyledContent>
      </PageLayout>
    </AntConfigProvider>
  );
}

export default App;
