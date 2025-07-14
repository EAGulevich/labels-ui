import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import {
  MESSAGE_SHOW_DURATION_S,
  MESSAGE_SHOW_RECONNECTING_DURATION_S,
} from "@constants";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseHostConnectDisconnectProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useHostConnectDisconnect = ({
  messageApi,
}: UseHostConnectDisconnectProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  useEffect(() => {
    const hostLeftRoom: ServerToClientEvents["hostLeftRoom"] = (data) => {
      setRoom(data.room);

      messageApi.open({
        key: data.room.code,
        type: "loading",
        content: t("messages.hostLeftRoom"),
        duration: MESSAGE_SHOW_RECONNECTING_DURATION_S,
      });
    };

    const hostReturnedToRoom: ServerToClientEvents["hostReturnedToRoom"] = (
      data,
    ) => {
      setRoom(data.room);
      messageApi.open({
        key: data.room.code,
        type: "success",
        content: t("messages.hostReturnedToRoom"),
        duration: MESSAGE_SHOW_DURATION_S,
      });
    };

    socket.on("hostLeftRoom", hostLeftRoom);
    socket.on("hostReturnedToRoom", hostReturnedToRoom);

    return () => {
      socket.off("hostLeftRoom", hostLeftRoom);
      socket.off("hostReturnedToRoom", hostReturnedToRoom);
    };
  }, [messageApi, setRoom, t]);
};
