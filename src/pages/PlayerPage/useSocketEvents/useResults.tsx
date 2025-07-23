import { useEffect } from "react";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseNewVipProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useResults = ({ messageApi }: UseNewVipProps) => {
  const { setRoom } = useGameState();

  useEffect(() => {
    const onResults: ServerToClientEvents["results"] = ({ room }) => {
      setRoom(room);
    };

    socket.on("results", onResults);

    return () => {
      socket.off("results", onResults);
    };
  }, [messageApi, setRoom]);
};
