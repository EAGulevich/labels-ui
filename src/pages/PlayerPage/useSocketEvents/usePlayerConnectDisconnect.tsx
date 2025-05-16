import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UsePlayerConnectDisconnectProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const usePlayerConnectDisconnect = ({
  setRoom,
  messageApi,
}: UsePlayerConnectDisconnectProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const joinRoom: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);

      messageApi.open({
        type: "info",
        content: t("messages.joinedPlayer", {
          playerName: data.eventData.joinedPlayer.name,
        }),
      });
    };

    const playerHasReconnected: ServerToClientEvents["playerHasReconnected"] = (
      data,
    ) => {
      setRoom(data.room);

      messageApi.open({
        type: "info",
        content: t("messages.playerReconnected", {
          playerName: data.eventData.reconnectedPlayer.name,
        }),
      });
    };

    const disconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
      messageApi.open({
        type: "warning",
        content: t("messages.playerLeft", {
          playerName: data.eventData.disconnectedPlayer.name,
        }),
      });
    };

    const playerLostConnection: ServerToClientEvents["playerLostConnection"] = (
      data,
    ) => {
      setRoom(data.room);
      messageApi.open({
        type: "warning",
        content: t("messages.playerLostConnection", {
          playerName: data.eventData.markedInactivePlayer.name,
        }),
      });
    };

    socket.on("joinedPlayer", joinRoom);
    socket.on("disconnectedPlayer", disconnectedPlayer);
    socket.on("playerHasReconnected", playerHasReconnected);
    socket.on("playerLostConnection", playerLostConnection);

    return () => {
      socket.off("disconnectedPlayer", disconnectedPlayer);
      socket.off("joinedPlayer", joinRoom);
      socket.off("playerHasReconnected", playerHasReconnected);
      socket.off("playerLostConnection", playerLostConnection);
    };
  }, [messageApi, setRoom, t]);
};
