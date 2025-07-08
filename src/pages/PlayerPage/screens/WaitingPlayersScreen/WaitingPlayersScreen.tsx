import { useTranslation } from "react-i18next";
import { Button, Result, Spin } from "antd";

import { MIN_PLAYERS } from "@shared/constants/validations.ts";
import { AvatarToken, PlayerClient } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";

import { AvatarSelect } from "./AvatarSelect/AvatarSelect.tsx";

type WaitingPlayersScreenProps = {
  onStart: () => void;
  isAvatarSelected: boolean;
  player: PlayerClient;
  onChangePlayerAvatar: (avatarToken: PlayerClient["avatar"]["token"]) => void;
};

export const WaitingPlayersScreen = ({
  onStart,
  isAvatarSelected,
  player,
  onChangePlayerAvatar,
}: WaitingPlayersScreenProps) => {
  const { t } = useTranslation();
  const { room } = useGameState();

  const usedAvatarTokens = Object.values(AvatarToken).filter(
    (token) =>
      room?.players.some((player) => player.avatar.token === token) &&
      player.avatar.token !== token,
  );

  if (!isAvatarSelected) {
    return (
      <AvatarSelect
        value={player.avatar.token}
        disabledItems={usedAvatarTokens}
        onChange={onChangePlayerAvatar}
      />
    );
  }

  if ((room?.players.length || 0) < MIN_PLAYERS) {
    return (
      <Spin
        tip={t("waitingPlayersScreen.waitingAllPlayers")}
        size="large"
        fullscreen
      />
    );
  }
  if (player.isVip) {
    return (
      <Result
        status="info"
        title={t("waitingPlayersScreen.vipScreen.title")}
        extra={
          <Button type="primary" onClick={onStart}>
            {t("waitingPlayersScreen.vipScreen.buttons.start")}
          </Button>
        }
      />
    );
  }
  return (
    <Spin
      tip={t("waitingPlayersScreen.waitingVipStarts")}
      size="large"
      fullscreen
    />
  );
};
