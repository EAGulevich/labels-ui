import { useState } from "react";
import { message } from "antd";

import { Room } from "@sharedTypes/types.ts";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useConnectDisconnectPlayer } from "./useConnectDisconnectPlayer.tsx";
import { useGameStarted } from "./useGameStarted.tsx";
import { useNewRound } from "./useNewRound.tsx";
import { useReceiveFact } from "./useReceiveFact.tsx";
import { useVoting } from "./useVoting.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [room, setRoom] = useState<Room | undefined>(undefined);

  const { isServerError } = useConnectDisconnect();
  const { onReenterRoom, onCreateRoom, startVoting } = useActions({
    setRoom,
    messageApi,
  });

  useConnectDisconnectPlayer({ setRoom });
  useGameStarted({ setRoom, messageApi });
  useReceiveFact({ setRoom, messageApi });
  useNewRound({ setRoom, messageApi });
  useVoting({ setRoom, messageApi });

  return {
    contextHolder,
    room,
    isServerError,
    onCreateRoom,
    onReenterRoom,
    startVoting,
  };
};
