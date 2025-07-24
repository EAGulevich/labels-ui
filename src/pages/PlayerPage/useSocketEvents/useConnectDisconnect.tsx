import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { message } from "antd";

import { ROOM_CODE_LENGTH } from "@shared/constants/validations.ts";

import {
  MESSAGE_SHOW_RECONNECTING_DURATION_S,
  QUERY_PARAM_ROOM_CODE,
} from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { socket } from "@socket";

import { useActions } from "./useActions.tsx";

type UseConnectDisconnectProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

const MESSAGE_CONNECTING_KEY = "MESSAGE_CONNECTING_KEY";

export const useConnectDisconnect = ({
  messageApi,
}: UseConnectDisconnectProps) => {
  const [isServerError, setIsServerError] = useState(false);
  const { userId, userName } = useAppStorage();
  const { onJoin } = useActions({ messageApi });
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const roomCode =
    searchParams
      .get(QUERY_PARAM_ROOM_CODE)
      ?.toUpperCase()
      .slice(0, ROOM_CODE_LENGTH) || "";

  const onConnect = useCallback(() => {
    setIsServerError(false);
    messageApi.open({
      key: MESSAGE_CONNECTING_KEY,
      type: "success",
      content: t("messages.connectionIsActive"),
    });

    if (roomCode && userId) {
      onJoin({
        roomCode,
        player: {
          name: userName,
        },
      });
    }
  }, [messageApi, onJoin, roomCode, t, userId, userName]);

  const onDisconnect = useCallback(() => {}, []);

  useEffect(() => {
    if (!socket.connected) {
      messageApi.open({
        key: MESSAGE_CONNECTING_KEY,
        type: "loading",
        content: t("messages.connecting"),
        duration: MESSAGE_SHOW_RECONNECTING_DURATION_S,
      });
    }

    const onConnectError = () => {
      setIsServerError(true);
    };

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      // socket.disconnect();
    };
  }, [messageApi, onConnect, onDisconnect, t]);

  return { isServerError };
};
