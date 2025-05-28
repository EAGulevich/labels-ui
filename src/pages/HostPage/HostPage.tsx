import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Result, Tag } from "antd";

import { HEADER_INFO_CONTAINER, ROUTE_PATHS } from "@constants";
import { ROOM_STATUSES } from "@sharedTypes/roomStatuses.ts";

import { CreateOrReturnToRoom } from "./screens/CreateOrReturnToRoom/CreateOrReturnToRoom.tsx";
import { InputFactScreen } from "./screens/InputFactScreen/InputFactScreen.tsx";
import { RoundScreen } from "./screens/RoundScreen/RoundScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const HostPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    room,
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
    room?.status !== ROOM_STATUSES.CREATED && roomCode && headerMenuElement;

  return (
    <>
      {contextHolder}
      {showCodeInHeader &&
        createPortal(<Tag color={"gold"}>{room?.code}</Tag>, headerMenuElement)}
      {!room && (
        <CreateOrReturnToRoom
          onCreateRoom={onCreateRoom}
          onReenterRoom={onReenterRoom}
        />
      )}
      {room?.status === ROOM_STATUSES.CREATED && (
        <WaitingPlayersScreen room={room} />
      )}

      {room?.status === ROOM_STATUSES.STARTED && (
        <InputFactScreen players={room.players} />
      )}

      {(room?.status == ROOM_STATUSES.ROUND ||
        room?.status === ROOM_STATUSES.VOTING) && (
        <RoundScreen
          facts={room.facts}
          votingFact={room.votingFact}
          players={room.players}
          onTimerFinish={startVoting}
          roomStatus={room.status}
          round={room.round}
          story={room.story}
        />
      )}
    </>
  );
};

export default HostPage;
