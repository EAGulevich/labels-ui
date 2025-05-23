import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseHostConnectDisconnectProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useHostConnectDisconnect = ({
  setRoom,
  messageApi,
}: UseHostConnectDisconnectProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const hostLeftRoom: ServerToClientEvents["hostLeftRoom"] = (data) => {
      setRoom(data.room);

      messageApi.open({
        key: data.room.code,
        type: "loading",
        content: t("messages.hostLeftRoom"),
        // todo later: подумать сколько нужно
        duration: 60 * 3,
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
        duration: 2,
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
