import { useTranslation } from "react-i18next";
import { Button, Result, Spin } from "antd";

type WaitingPlayersScreenProps = {
  isVip: boolean;
  isMinNumberOfPlayers: boolean;
  onStart: () => void;
};

export const WaitingPlayersScreen = ({
  isMinNumberOfPlayers,
  isVip,
  onStart,
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
          <Button type="primary" onClick={onStart}>
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
