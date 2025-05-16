import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseGameStartedProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useGameStarted = ({
  setRoom,
  messageApi,
}: UseGameStartedProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const gameStarted: ServerToClientEvents["gameStarted"] = ({ room }) => {
      setRoom(room);
    };

    socket.on("gameStarted", gameStarted);

    return () => {
      socket.off("gameStarted", gameStarted);
    };
  }, [messageApi, setRoom, t]);
};
