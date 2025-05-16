import { useState } from "react";
import { message } from "antd";

import { Room } from "@sharedTypes/types.ts";

import { useActions } from "./useActions.tsx";
import { useConnectDisconnect } from "./useConnectDisconnect.tsx";
import { useHostConnectDisconnect } from "./useHostConnectDisconnect.tsx";
import { useNewVip } from "./useNewVip.tsx";
import { usePlayerConnectDisconnect } from "./usePlayerConnectDisconnect.tsx";

export const useSocketEvents = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [room, setRoom] = useState<Room | null>(null);

  const { isServerError } = useConnectDisconnect();

  useHostConnectDisconnect({ setRoom, messageApi });
  usePlayerConnectDisconnect({ setRoom, messageApi });
  useNewVip({ setRoom, messageApi });

  const { onJoin } = useActions({ setRoom, messageApi });

  return {
    room,
    contextHolder,
    onJoin,
    isServerError,
  };
};
