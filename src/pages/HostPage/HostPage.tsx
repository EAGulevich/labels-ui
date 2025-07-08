import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import { ROOM_STATUSES } from "@shared/types";

import { HEADER_INFO_CONTAINER, ROUTE_PATHS } from "@constants";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { GameResultScreen } from "../PlayerPage/screens/GameResultScreen/GameResultScreen.tsx";
import { CreateOrReturnToRoom } from "./screens/CreateOrReturnToRoom/CreateOrReturnToRoom.tsx";
import { InputFactScreen } from "./screens/InputFactScreen/InputFactScreen.tsx";
import { RoundScreen } from "./screens/RoundScreen/RoundScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";
import { RoomCodeTag } from "./styles.ts";

const HostPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { room, showCountDownBeforeStart } = useGameState();

  const {
    isServerError,
    onCreateRoom,
    onReenterRoom,
    contextHolder,
    startVoting,
  } = useSocketEvents();

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
  const roomCode = room?.code;

  const showCodeInHeader =
    room?.status !== ROOM_STATUSES.LOBBY && roomCode && headerMenuElement;

  return (
    <>
      {contextHolder}
      {showCodeInHeader &&
        createPortal(<RoomCodeTag>{roomCode}</RoomCodeTag>, headerMenuElement)}
      {!room && (
        <CreateOrReturnToRoom
          onCreateRoom={onCreateRoom}
          onReenterRoom={onReenterRoom}
        />
      )}
      {(room?.status === ROOM_STATUSES.LOBBY || showCountDownBeforeStart) && (
        <WaitingPlayersScreen showCountDown={showCountDownBeforeStart} />
      )}

      {room?.status === ROOM_STATUSES.SUBMITTING_FACTS &&
        !showCountDownBeforeStart && <InputFactScreen />}

      {room?.status == ROOM_STATUSES.ROUND && (
        <RoundScreen onTimerFinish={startVoting} />
      )}

      {room?.status == ROOM_STATUSES.RESULTS && <GameResultScreen />}
    </>
  );
};

export default HostPage;
