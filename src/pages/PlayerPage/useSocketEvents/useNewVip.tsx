import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseNewVipProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useNewVip = ({ setRoom, messageApi }: UseNewVipProps) => {
  const { t } = useTranslation();
  const { playerId } = useAppStorage();

  useEffect(() => {
    const updateVipPlayer: ServerToClientEvents["updateVipPlayer"] = (data) => {
      setRoom(data.room);

      if (data.eventData.newVipPlayer.id === playerId) {
        messageApi.open({
          type: "info",
          content: t("messages.youHaveBecomeVIP"),
        });
      } else {
        messageApi.open({
          type: "info",
          content: t("messages.playerHasBecomeVIP", {
            playerName: data.eventData.newVipPlayer.name,
          }),
        });
      }
    };

    socket.on("updateVipPlayer", updateVipPlayer);

    return () => {
      socket.off("updateVipPlayer", updateVipPlayer);
    };
  }, [messageApi, playerId, setRoom, t]);
};
