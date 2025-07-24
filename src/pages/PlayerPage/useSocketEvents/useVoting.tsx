import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { vibrate } from "../utils/vibrate.ts";

type UseReceiveFact = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useVoting = ({ messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();
  const { room, setRoom } = useGameState();

  useEffect(() => {
    const voting: ServerToClientEvents["voting"] = ({ room: newRoom }) => {
      setRoom(newRoom);
      if (
        room?.votingData?.currentVotingFact.id !==
        newRoom.votingData?.currentVotingFact.id
      ) {
        vibrate("voteRequest");
      }
    };

    socket.on("voting", voting);

    return () => {
      socket.off("voting", voting);
    };
  }, [messageApi, room?.votingData?.currentVotingFact, setRoom, t]);
};
