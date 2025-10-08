import { getLayoutContainer } from "@utils/getLayoutContainer.ts";
import { message } from "antd";

import { MESSAGE_TOP } from "@constants";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useConnectDisconnectPlayer } from "./useConnectDisconnectPlayer.tsx";
import { useGameStarted } from "./useGameStarted.tsx";
import { useNewRound } from "./useNewRound.tsx";
import { useNewVip } from "./useNewVip.tsx";
import { usePlayerChangedAvatar } from "./usePlayerChangedAvatar.tsx";
import { useReceiveFact } from "./useReceiveFact.tsx";
import { useResults } from "./useResults.tsx";
import { useVoting } from "./useVoting.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage({
    top: MESSAGE_TOP,
    getContainer: getLayoutContainer,
  });

  const { isServerError } = useConnectDisconnect({ messageApi });
  const { onReenterRoom, onCreateRoom, startVoting } = useActions({
    messageApi,
  });

  useConnectDisconnectPlayer();
  useGameStarted({ messageApi });
  useReceiveFact({ messageApi });
  useNewRound({ messageApi });
  useVoting({ messageApi });
  usePlayerChangedAvatar({ messageApi });
  useNewVip({ messageApi });
  useResults({ messageApi });

  return {
    contextHolder,
    isServerError,
    onCreateRoom,
    onReenterRoom,
    startVoting,
  };
};
