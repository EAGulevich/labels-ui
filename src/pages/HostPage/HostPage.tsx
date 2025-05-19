import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import { ROUTE_PATHS } from "@constants";
import { ROOM_STATUSES } from "@sharedTypes/roomStatuses.ts";

import { CreateOrReturnToRoom } from "./screens/CreateOrReturnToRoom/CreateOrReturnToRoom.tsx";
import { InputFactScreen } from "./screens/InputFactScreen/InputFactScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const HostPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { room, isServerError, onCreateRoom, onReenterRoom, contextHolder } =
    useSocketEvents();

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
      {/*todo later: вывести код комнаты*/}
      {/*<StyledTag color="gold">{room?.code}</StyledTag>*/}
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
    </>
  );
};

export default HostPage;
