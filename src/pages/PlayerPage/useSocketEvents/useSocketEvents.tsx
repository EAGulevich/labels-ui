import { message } from "antd";

import { MESSAGE_TOP } from "@constants";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useGameStarted } from "./useGameStarted.tsx";
import { useHostConnectDisconnect } from "./useHostConnectDisconnect.tsx";
import { useNewRound } from "./useNewRound.tsx";
import { useNewVip } from "./useNewVip.tsx";
import { usePlayerChangedAvatar } from "./usePlayerChangedAvatar.tsx";
import { usePlayerConnectDisconnect } from "./usePlayerConnectDisconnect.tsx";
import { useReceiveFact } from "./useReceiveFact.tsx";
import { useResults } from "./useResults.tsx";
import { useVoting } from "./useVoting.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage({
    top: MESSAGE_TOP,
  });

  const { isServerError } = useConnectDisconnect({ messageApi });

  useHostConnectDisconnect({ messageApi });
  usePlayerConnectDisconnect({ messageApi });
  useNewVip({ messageApi });
  useGameStarted({ messageApi });
  useReceiveFact({ messageApi });
  useVoting({ messageApi });
  useNewRound({ messageApi });
  usePlayerChangedAvatar({ messageApi });
  useResults({ messageApi });

  const {
    onJoin,
    onStart,
    onSendFact,
    addVote,
    onChangePlayerAvatar,
    onShowResult,
  } = useActions({ messageApi });

  return {
    contextHolder,
    onJoin,
    isServerError,
    onStart,
    onSendFact,
    addVote,
    onChangePlayerAvatar,
    onShowResult,
  };
};
