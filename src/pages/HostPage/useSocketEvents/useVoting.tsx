import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseReceiveFact = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useVoting = ({ messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  useEffect(() => {
    const voting: ServerToClientEvents["voting"] = ({ room }) => {
      setRoom(room);
    };

    socket.on("voting", voting);

    return () => {
      socket.off("voting", voting);
    };
  }, [messageApi, setRoom, t]);
};
