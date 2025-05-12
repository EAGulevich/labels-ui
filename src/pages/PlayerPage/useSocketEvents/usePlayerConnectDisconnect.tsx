import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { useCallback, useEffect } from "react";
import { socket } from "@socket";
import { useTranslation } from "react-i18next";
import { Room } from "@sharedTypes/types.ts";
import { message } from "antd";

type UsePlayerConnectDisconnectProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

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
        content: t("joinScreen.messages.youEnteredInRoom"),
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
