import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseReceiveFact = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useReceiveFact = ({ setRoom, messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();

  useEffect(() => {
    const playerAddedFact: ServerToClientEvents["playerAddedFact"] = ({
      room,
    }) => {
      setRoom(room);
    };

    socket.on("playerAddedFact", playerAddedFact);

    return () => {
      socket.off("playerAddedFact", playerAddedFact);
    };
  }, [messageApi, setRoom, t]);
};
