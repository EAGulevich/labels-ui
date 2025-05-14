import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import { ROUTE_PATHS } from "@constants";

import { JoinScreen } from "./screens/JoinScreen/JoinScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const PlayerPage = () => {
  const navigate = useNavigate();
  const { room, contextHolder, onJoin, isServerError } = useSocketEvents();
  const { t } = useTranslation();

  if (isServerError) {
    return (
      <Result
        icon={<FrownOutlined />}
        title={t("errors.500.title")}
        subTitle={t("errors.500.subTitle")}
        extra={
          <Button type="primary" onClick={() => navigate(ROUTE_PATHS.home)}>
            {t("errors.500.btnTitle")}
          </Button>
        }
      />
    );
  }

  return (
    <>
      {contextHolder}
      {!room && <JoinScreen onJoin={onJoin} />}
      {!!room && <WaitingPlayersScreen />}
    </>
  );
};

export default PlayerPage;
