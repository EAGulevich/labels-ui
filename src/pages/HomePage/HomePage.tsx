import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button, Flex } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { ROUTE_PATHS } from "@constants";
import { socket } from "@socket";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    socket.disconnect();
  }, []);

  return (
    <>
      <MainAnimatedLogo />
      <Flex vertical>
        <Button
          size={"large"}
          type={"link"}
          onClick={() => navigate(ROUTE_PATHS.host)}
        >
          {t("home.menu.newGame")}
        </Button>

        <Button
          size={"large"}
          type={"link"}
          onClick={() => navigate(ROUTE_PATHS.player)}
        >
          {t("home.menu.join")}
        </Button>
      </Flex>
    </>
  );
};

export default HomePage;
