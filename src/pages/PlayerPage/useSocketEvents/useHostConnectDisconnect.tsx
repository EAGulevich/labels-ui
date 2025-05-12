import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { useCallback, useEffect } from "react";
import { socket } from "@socket";
import { useTranslation } from "react-i18next";
import { Room } from "@sharedTypes/types.ts";
import { message } from "antd";

type UseHostConnectDisconnectProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useHostConnectDisconnect = ({
  setRoom,
  messageApi,
}: UseHostConnectDisconnectProps) => {
  const { t } = useTranslation();

  const creatorWasDisconnect: ServerToClientEvents["creatorWasDisconnect"] =
    useCallback(
      (data) => {
        setRoom(data.room);

        // TODO: + добавить обработку эвента с сервера, что комната удалена, т.к. хост не переподключился

        messageApi.open({
          key: data.room.code,
          type: "loading",
          content: t("joinScreen.messages.reconnecting"),
          duration: 10000,
        });
      },
      [messageApi, setRoom, t],
    );

  const creatorWasConnected: ServerToClientEvents["creatorWasConnected"] =
    useCallback(
      (data) => {
        setRoom(data.room);
        messageApi.open({
          key: data.room.code,
          type: "success",
          content: t("joinScreen.messages.reconnected"),
          duration: 2,
        });
      },
      [setRoom, messageApi, t],
    );

  useEffect(() => {
    socket.on("creatorWasDisconnect", creatorWasDisconnect);
    socket.on("creatorWasConnected", creatorWasConnected);

    return () => {
      socket.off("creatorWasDisconnect", creatorWasDisconnect);
      socket.off("creatorWasConnected", creatorWasConnected);
    };
  }, [creatorWasDisconnect, creatorWasConnected]);
};
