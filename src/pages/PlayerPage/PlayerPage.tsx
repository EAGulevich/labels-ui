import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Flex, Result, Typography } from "antd";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { HEADER_INFO_CONTAINER, ROUTE_PATHS } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { ROOM_STATUSES } from "@sharedTypes/roomStatuses.ts";

import { DiscussionScreen } from "./screens/DiscussionScreen/DiscussionScreen.tsx";
import { GameOverScreen } from "./screens/GameOverScreen/GameOverScreen.tsx";
import { InputFactScreen } from "./screens/InputFactScreen/InputFactScreen.tsx";
import { JoinScreen } from "./screens/JoinScreen/JoinScreen.tsx";
import { VoteScreen } from "./screens/VoteScreen/VoteScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";
import { PlayerLayout } from "./styles.ts";

const PlayerPage = () => {
  const navigate = useNavigate();
  const {
    contextHolder,
    onJoin,
    onStart,
    isServerError,
    isVip,
    onSendFact,
    addVote,
    onChangePlayerAvatar,
  } = useSocketEvents();
  const { playerId } = useAppStorage();
  const { t } = useTranslation();
  const { room } = useGameState();

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

  const headerMenuElement = document.getElementById(HEADER_INFO_CONTAINER);
  const player = room?.players.find((p) => p.id === playerId);

  const isAllGuessed =
    room?.status === ROOM_STATUSES.ROUND &&
    !room?.players.filter((p) => p.factStatus === FACT_STATUS.NOT_GUESSED)
      .length;

  return (
    <PlayerLayout>
      {contextHolder}
      {player &&
        headerMenuElement &&
        createPortal(
          <Flex gap={"small"} justify={"center"} align={"center"}>
            <PlayerAvatar token={player.avatarToken} size={"small"} />
            <Typography.Text>{player.name}</Typography.Text>
          </Flex>,
          headerMenuElement,
        )}
      {!room && <JoinScreen onJoin={onJoin} />}
      {player && room?.status === ROOM_STATUSES.CREATED && (
        <WaitingPlayersScreen
          isVip={isVip}
          onStart={onStart}
          isAvatarSelected={!player.isAvatarAutoSelected}
          player={player}
          onChangePlayerAvatar={onChangePlayerAvatar}
        />
      )}
      {room?.status === ROOM_STATUSES.STARTED && (
        <InputFactScreen onSendFact={onSendFact} />
      )}

      {room?.status === ROOM_STATUSES.ROUND &&
        (isAllGuessed ? <GameOverScreen /> : <DiscussionScreen />)}

      {room?.status === ROOM_STATUSES.VOTING && (
        <VoteScreen addVote={addVote} />
      )}
    </PlayerLayout>
  );
};

export default PlayerPage;
