import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseReceiveFact = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useReceiveFact = ({ messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  useEffect(() => {
    const playerAddedFact: ServerToClientEvents["playerAddedFact"] = ({
      room,
    }) => {
      setRoom(room);
    };

    socket.on("playerAddedFact", playerAddedFact);

    return () => {
      socket.off("playerAddedFact", playerAddedFact);
    };
  }, [messageApi, setRoom, t]);
};
