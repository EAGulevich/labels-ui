import {
  Button,
  ConfigProvider as AntConfigProvider,
  Result,
  theme as AntTheme,
  Layout,
} from "antd";
import { DarkTheme, Theme } from "./theme/theme.tsx";
import ruRU from "antd/locale/ru_RU";
import { FC, lazy, PropsWithChildren } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { ThemeName, useApp } from "./AppProvider.tsx";
import { FrownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header/Header.tsx";
const { Content } = Layout;

const HomeRouteComponent = lazy(() => import("./pages/Home/Home.tsx"));

const CreateRoomRouteComponent = lazy(
  () => import("./pages/CreateRoomScreen/CreateRoomScreen.tsx"),
);

const JoinRouteComponent = lazy(
  () => import("./pages/JoinScreen/JoinScreen.tsx"),
);

export const StyledPageLayout = styled(Layout)`
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
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <AntConfigProvider theme={getThemeByName(themeName)} locale={ruRU}>
      <PageLayout>
        <Header hideLogo={location.pathname === "/"} />

        <Content style={{ height: "calc(100vh - 50px)" }}>
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
        </Content>
      </PageLayout>
    </AntConfigProvider>
  );
}

export default App;
