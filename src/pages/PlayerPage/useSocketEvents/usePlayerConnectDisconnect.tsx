import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UsePlayerConnectDisconnectProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};
// TODO: review

export const usePlayerConnectDisconnect = ({
  setRoom,
  messageApi,
}: UsePlayerConnectDisconnectProps) => {
  const { t } = useTranslation();

  const joinRoom: ServerToClientEvents["joinedPlayer"] = useCallback(
    (data) => {
      setRoom(data.room);

      // TODO: Игрок Петя подключился
      messageApi.open({
        type: "success",
        content: t("messages.youEnteredInRoom"),
      });
    },
    [setRoom, messageApi, t],
  );

  const disconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] =
    useCallback(
      (data) => {
        setRoom(data.room);

        // TODO: Игрок Петя отключился
        // messageApi.open({
        //   type: "success",
        //   content: t("joinScreen.messages.youEnteredInRoom"),
        // });
      },
      [setRoom],
    );

  useEffect(() => {
    socket.on("joinedPlayer", joinRoom);
    socket.on("disconnectedPlayer", disconnectedPlayer);

    return () => {
      socket.off("disconnectedPlayer", disconnectedPlayer);
      socket.off("joinedPlayer", joinRoom);
    };
  }, [joinRoom, disconnectedPlayer]);
};
