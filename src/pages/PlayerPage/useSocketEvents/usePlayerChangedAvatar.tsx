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

export const usePlayerChangedAvatar = ({
  setRoom,
  messageApi,
}: UseNewVipProps) => {
  const { t } = useTranslation();
  const { playerId } = useAppStorage();

  useEffect(() => {
    const playerChangedAvatar: ServerToClientEvents["playerChangedAvatar"] = ({
      room,
    }) => {
      setRoom(room);
    };

    socket.on("playerChangedAvatar", playerChangedAvatar);

    return () => {
      socket.off("playerChangedAvatar", playerChangedAvatar);
    };
  }, [messageApi, playerId, setRoom, t]);
};
