import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseNewVipProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useNewVip = ({ messageApi }: UseNewVipProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();
  const { userId } = useAppStorage();

  useEffect(() => {
    const updateVipPlayer: ServerToClientEvents["updateVipPlayer"] = (data) => {
      setRoom(data.room);
    };

    socket.on("updateVipPlayer", updateVipPlayer);

    return () => {
      socket.off("updateVipPlayer", updateVipPlayer);
    };
  }, [messageApi, setRoom, t, userId]);
};
