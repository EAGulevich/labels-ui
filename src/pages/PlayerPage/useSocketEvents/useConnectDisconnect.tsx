import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { message } from "antd";

import { ROOM_CODE_LENGTH } from "@shared/constants/validations.ts";

import { QUERY_PARAM_ROOM_CODE } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { socket } from "@socket";

import { useActions } from "./useActions.tsx";

type UseConnectDisconnectProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useConnectDisconnect = ({
  messageApi,
}: UseConnectDisconnectProps) => {
  const [isServerError, setIsServerError] = useState(false);
  const { userId, userName } = useAppStorage();
  const { onJoin } = useActions({ messageApi });

  const [searchParams] = useSearchParams();
  const roomCode =
    searchParams
      .get(QUERY_PARAM_ROOM_CODE)
      ?.toUpperCase()
      .slice(0, ROOM_CODE_LENGTH) || "";

  const onConnect = useCallback(() => {
    if (roomCode && userId) {
      onJoin({
        roomCode,
        player: {
          name: userName,
        },
      });
    }
  }, [onJoin, roomCode, userId, userName]);

  useEffect(() => {
    const onConnectError = () => {
      setIsServerError(true);
    };

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      // socket.disconnect();
    };
  }, [onConnect]);

  return { isServerError };
};
