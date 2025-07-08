import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseNewVipProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const usePlayerChangedAvatar = ({ messageApi }: UseNewVipProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

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
  }, [messageApi, setRoom, t]);
};
