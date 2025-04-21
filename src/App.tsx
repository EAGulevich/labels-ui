import {
  Button,
  ConfigProvider as AntConfigProvider,
  Result,
  theme as AntTheme,
} from "antd";
import { DarkTheme, Theme } from "./theme/theme.tsx";
import ruRU from "antd/locale/ru_RU";
import { FC, PropsWithChildren } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Routes, useNavigate } from "react-router";
import { ThemeName, useApp } from "./AppProvider.tsx";
import { HomePage } from "./pages/Home/Home.tsx";
import { ThemeSwitcher } from "./components/ThemeSwither/ThemeSwitcher.tsx";
import { FrownOutlined } from "@ant-design/icons";

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
  return (
    <AntConfigProvider theme={getThemeByName(themeName)} locale={ruRU}>
      <PageLayout>
        <div style={{ position: "absolute", right: 0, margin: "20px" }}>
          <ThemeSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <Result
                icon={<FrownOutlined />}
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button type="primary" onClick={() => navigate("/")}>
                    Домой
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
