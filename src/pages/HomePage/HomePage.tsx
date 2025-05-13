import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button, Flex } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { ROUTE_PATHS } from "@constants";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <MainAnimatedLogo />
      <Flex vertical>
        <Button
          size={"large"}
          type={"link"}
          onClick={() => navigate(ROUTE_PATHS.room)}
        >
          {t("home.menu.newGame")}
        </Button>

        <Button
          size={"large"}
          type={"link"}
          onClick={() => navigate(ROUTE_PATHS.game)}
        >
          {t("home.menu.join")}
        </Button>
      </Flex>
    </>
  );
};

export default HomePage;
