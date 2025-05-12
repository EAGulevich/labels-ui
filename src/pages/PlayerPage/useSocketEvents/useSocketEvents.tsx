import { useCallback, useEffect, useState } from "react";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { useHostConnectDisconnect } from "./useHostConnectDisconnect.tsx";
import { usePlayerConnectDisconnect } from "./usePlayerConnectDisconnect.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const [room, setRoom] = useState<Room | null>(null);

  useHostConnectDisconnect({ setRoom, messageApi });
  usePlayerConnectDisconnect({ setRoom, messageApi });

  const joiningPlayerError: ServerToClientEvents["joiningPlayerError"] =
    useCallback(() => {
      setRoom(null);
      messageApi.open({
        type: "error",
        content: t("joinScreen.messages.wrongRoomCode"),
      });
    }, [t, messageApi]);

  useEffect(() => {
    socket.on("joiningPlayerError", joiningPlayerError);

    return () => {
      socket.off("joiningPlayerError", joiningPlayerError);
    };
  }, [joiningPlayerError]);

  return {
    room,
    contextHolder,
  };
};
