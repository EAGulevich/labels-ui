import { useState } from "react";
import { message } from "antd";

import { Room } from "@sharedTypes/types.ts";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useConnectDisconnectPlayer } from "./useConnectDisconnectPlayer.tsx";
import { useGameStarted } from "./useGameStarted.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [room, setRoom] = useState<Room | undefined>(undefined);

  const { isServerError } = useConnectDisconnect();
  const { onReenterRoom, onCreateRoom } = useActions({ setRoom, messageApi });

  useConnectDisconnectPlayer({ setRoom });
  useGameStarted({ setRoom, messageApi });

  return {
    contextHolder,
    room,
    isServerError,
    onCreateRoom,
    onReenterRoom,
  };
};
