import { message } from "antd";

import { useGameState } from "@providers/GameStateProvider.tsx";

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
  const { setRoom, setShowCountDownBeforeStart } = useGameState();

  const { isServerError } = useConnectDisconnect();
  const { onReenterRoom, onCreateRoom, startVoting } = useActions({
    setRoom,
    messageApi,
  });

  useConnectDisconnectPlayer({ setRoom });
  useGameStarted({ setRoom, messageApi, setShowCountDownBeforeStart });
  useReceiveFact({ setRoom, messageApi });
  useNewRound({ setRoom, messageApi });
  useVoting({ setRoom, messageApi });
  usePlayerChangedAvatar({ setRoom, messageApi });

  return {
    contextHolder,
    isServerError,
    onCreateRoom,
    onReenterRoom,
    startVoting,
  };
};
