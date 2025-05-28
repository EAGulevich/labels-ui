import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Flex, Result, Typography } from "antd";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { HEADER_INFO_CONTAINER, MIN_PLAYERS, ROUTE_PATHS } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
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
    room,
    contextHolder,
    onJoin,
    onStart,
    isServerError,
    isVip,
    onSendFact,
    addVote,
  } = useSocketEvents();
  const { playerId } = useAppStorage();
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
      {room?.status === ROOM_STATUSES.CREATED && (
        <WaitingPlayersScreen
          isVip={isVip}
          isMinNumberOfPlayers={room.players.length >= MIN_PLAYERS}
          onStart={onStart}
        />
      )}
      {room?.status === ROOM_STATUSES.STARTED && (
        <InputFactScreen players={room.players} onSendFact={onSendFact} />
      )}

      {room?.status === ROOM_STATUSES.ROUND &&
        (isAllGuessed ? (
          <GameOverScreen room={room} />
        ) : (
          <DiscussionScreen facts={room.facts} />
        ))}

      {room?.status === ROOM_STATUSES.VOTING && (
        <VoteScreen votingFact={room.votingFact} addVote={addVote} />
      )}
    </PlayerLayout>
  );
};

export default PlayerPage;
