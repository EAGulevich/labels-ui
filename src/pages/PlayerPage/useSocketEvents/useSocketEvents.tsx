import { useState } from "react";
import { message } from "antd";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { Room } from "@sharedTypes/types.ts";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useGameStarted } from "./useGameStarted.tsx";
import { useHostConnectDisconnect } from "./useHostConnectDisconnect.tsx";
import { useNewRound } from "./useNewRound.tsx";
import { useNewVip } from "./useNewVip.tsx";
import { usePlayerChangedAvatar } from "./usePlayerChangedAvatar.tsx";
import { usePlayerConnectDisconnect } from "./usePlayerConnectDisconnect.tsx";
import { useReceiveFact } from "./useReceiveFact.tsx";
import { useVoting } from "./useVoting.tsx";

export const useSocketEvents = () => {
  const { playerId } = useAppStorage();

  const [messageApi, contextHolder] = message.useMessage();

  const [room, setRoom] = useState<Room | null>(null);

  const { isServerError } = useConnectDisconnect();

  useHostConnectDisconnect({ setRoom, messageApi });
  usePlayerConnectDisconnect({ setRoom, messageApi });
  useNewVip({ setRoom, messageApi });
  useGameStarted({ setRoom, messageApi });
  useReceiveFact({ setRoom, messageApi });
  useVoting({ setRoom, messageApi });
  useNewRound({ setRoom, messageApi });
  usePlayerChangedAvatar({ setRoom, messageApi });

  const { onJoin, onStart, onSendFact, addVote, onChangePlayerAvatar } =
    useActions({
      setRoom,
      messageApi,
    });
  const isVip = !!room?.players.find((p) => p.isVip && p.id === playerId);

  return {
    room,
    contextHolder,
    onJoin,
    isServerError,
    isVip,
    onStart,
    onSendFact,
    addVote,
    onChangePlayerAvatar,
  };
};
