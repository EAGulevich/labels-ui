import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button, Flex } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <MainAnimatedLogo />
      <Flex vertical>
        <Button size={"large"} type={"link"} onClick={() => navigate("/new")}>
          {t("home.menu.newGame")}
        </Button>
        <Button size={"large"} type={"link"} onClick={() => navigate("/join")}>
          {t("home.menu.join")}
        </Button>
      </Flex>
    </div>
  );
};

export default HomePage;
