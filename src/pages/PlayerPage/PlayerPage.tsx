import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Flex, Result, Typography } from "antd";

import { FACT_STATUSES, ROOM_STATUSES } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { HEADER_INFO_CONTAINER, ROUTE_PATHS } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

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
    onSendFact,
    addVote,
    onShowResult,
    onChangePlayerAvatar,
  } = useSocketEvents();
  const { t } = useTranslation();
  const { room } = useGameState();
  const { userId } = useAppStorage();

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
  const player = room?.players.find((p) => p.id === userId);

  const isNotAllGuessed = !!room?.players.some(
    (p) => p.factStatus === FACT_STATUSES.NOT_GUESSED,
  );

  return (
    <PlayerLayout>
      {contextHolder}
      {player &&
        headerMenuElement &&
        createPortal(
          <Flex gap={"small"} justify={"center"} align={"center"}>
            <PlayerAvatar token={player.avatar.token} size={"small"} />
            <Typography.Text>{player.name}</Typography.Text>
          </Flex>,
          headerMenuElement,
        )}
      {!room && <JoinScreen onJoin={onJoin} />}
      {player && room?.status === ROOM_STATUSES.LOBBY && (
        <WaitingPlayersScreen
          onStart={onStart}
          isAvatarSelected={!player.avatar.isAutoSelected}
          player={player}
          onChangePlayerAvatar={onChangePlayerAvatar}
        />
      )}
      {room?.status === ROOM_STATUSES.SUBMITTING_FACTS && (
        <InputFactScreen onSendFact={onSendFact} />
      )}

      {room?.status === ROOM_STATUSES.ROUND &&
        !room.votingData &&
        isNotAllGuessed && <DiscussionScreen />}
      {room?.status === ROOM_STATUSES.ROUND && !isNotAllGuessed && (
        <GameOverScreen
          onShowResult={player?.isVip ? onShowResult : undefined}
        />
      )}

      {!!room?.votingData && <VoteScreen addVote={addVote} />}

      {room?.status === ROOM_STATUSES.RESULTS && (
        // TODO
        <div> Полный список баллов по раундам</div>
      )}
    </PlayerLayout>
  );
};

export default PlayerPage;
