import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { vibrate } from "../utils/vibrate.ts";

type UseGameStartedProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useGameStarted = ({ messageApi }: UseGameStartedProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  useEffect(() => {
    const gameStarted: ServerToClientEvents["gameStarted"] = ({ room }) => {
      setRoom(room);
      vibrate("long");
    };

    socket.on("gameStarted", gameStarted);

    return () => {
      socket.off("gameStarted", gameStarted);
    };
  }, [messageApi, setRoom, t]);
};
