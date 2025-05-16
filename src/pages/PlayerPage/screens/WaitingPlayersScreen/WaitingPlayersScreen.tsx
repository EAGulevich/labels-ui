import { useTranslation } from "react-i18next";
import { Button, Result, Spin } from "antd";

type WaitingPlayersScreenProps = {
  isVip: boolean;
  isMinNumberOfPlayers: boolean;
};

export const WaitingPlayersScreen = ({
  isMinNumberOfPlayers,
  isVip,
}: WaitingPlayersScreenProps) => {
  const { t } = useTranslation();

  if (!isMinNumberOfPlayers) {
    return (
      <Spin
        tip={t("waitingPlayersScreen.waitingAllPlayers")}
        size="large"
        fullscreen
      />
    );
  } else if (isVip) {
    return (
      <Result
        status="info"
        title={t("waitingPlayersScreen.vipScreen.title")}
        extra={
          // TODO:
          <Button type="primary" disabled={true}>
            {t("waitingPlayersScreen.vipScreen.btnTitle")}
          </Button>
        }
      />
    );
  } else {
    return (
      <Spin
        tip={t("waitingPlayersScreen.waitingVipStarts")}
        size="large"
        fullscreen
      />
    );
  }
};
