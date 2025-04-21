import { Logo } from "../../components/Logo/Logo.tsx";
import { Button, Flex } from "antd";
import { StyledPageLayout } from "../../App.tsx";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <StyledPageLayout>
      <Logo />
      <Flex vertical>
        <Button size={"large"} type={"link"} onClick={() => navigate("/new")}>
          {t("home.menu.newGame")}
        </Button>
        <Button size={"large"} type={"link"} onClick={() => navigate("/join")}>
          {t("home.menu.join")}
        </Button>
      </Flex>
    </StyledPageLayout>
  );
};

export default HomePage;
