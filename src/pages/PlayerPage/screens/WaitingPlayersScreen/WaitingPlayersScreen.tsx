import { useTranslation } from "react-i18next";
import { Button, Result, Spin } from "antd";

import { MIN_PLAYERS } from "@constants";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { AvatarToken } from "@sharedTypes/avatarTokens.ts";
import { Player } from "@sharedTypes/types.ts";

import { AvatarSelect } from "./AvatarSelect/AvatarSelect.tsx";

type WaitingPlayersScreenProps = {
  isVip: boolean;
  onStart: () => void;
  isAvatarSelected: boolean;
  player: Player;
  onChangePlayerAvatar: (avatarToken: Player["avatarToken"]) => void;
};

export const WaitingPlayersScreen = ({
  isVip,
  onStart,
  isAvatarSelected,
  player,
  onChangePlayerAvatar,
}: WaitingPlayersScreenProps) => {
  const { t } = useTranslation();
  const { room } = useGameState();

  const usedAvatarTokens = Object.values(AvatarToken).filter(
    (token) =>
      room?.players.some((player) => player.avatarToken === token) &&
      player.avatarToken !== token,
  );

  if (!isAvatarSelected) {
    return (
      <AvatarSelect
        value={player.avatarToken}
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
  if (isVip) {
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
