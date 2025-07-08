import { useEffect } from "react";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useConnectDisconnectPlayer } from "./useConnectDisconnectPlayer.tsx";
import { useGameStarted } from "./useGameStarted.tsx";
import { useNewRound } from "./useNewRound.tsx";
import { usePlayerChangedAvatar } from "./usePlayerChangedAvatar.tsx";
import { useReceiveFact } from "./useReceiveFact.tsx";
import { useVoting } from "./useVoting.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setRoom } = useGameState();

  const { isServerError } = useConnectDisconnect();
  const { onReenterRoom, onCreateRoom, startVoting } = useActions({
    messageApi,
  });

  useConnectDisconnectPlayer();
  useGameStarted({ messageApi });
  useReceiveFact({ messageApi });
  useNewRound({ messageApi });
  useVoting({ messageApi });
  usePlayerChangedAvatar({ messageApi });

  useEffect(() => {
    const onResults: ServerToClientEvents["results"] = ({ room }) => {
      setRoom(room);
    };

    socket.on("results", onResults);

    return () => {
      socket.off("results", onResults);
    };
  }, [messageApi, setRoom]);

  return {
    contextHolder,
    isServerError,
    onCreateRoom,
    onReenterRoom,
    startVoting,
  };
};
