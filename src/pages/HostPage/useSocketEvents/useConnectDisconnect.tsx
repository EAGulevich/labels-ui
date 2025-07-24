import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { MESSAGE_SHOW_DURATION_S } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { socket } from "@socket";

type UseConnectDisconnectProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

const MESSAGE_CONNECTING_KEY = "MESSAGE_CONNECTING_KEY";

export const useConnectDisconnect = ({
  messageApi,
}: UseConnectDisconnectProps) => {
  const [isServerError, setIsServerError] = useState(false);
  const { userId, setUserId } = useAppStorage();
  const { t } = useTranslation();

  useEffect(() => {
    const onConnect = () => {
      setIsServerError(false);
      messageApi.open({
        key: MESSAGE_CONNECTING_KEY,
        type: "success",
        content: t("messages.connectionIsActive"),
      });
      if (userId) {
        socket.emit("findRoomByHostId", null, ({ foundedRoom }) => {
          if (!foundedRoom) {
            setUserId("");
          }
        });
      }
    };

    const onConnectError = () => {
      setIsServerError(true);
    };

    const onDisconnect = () => {
      messageApi.open({
        key: MESSAGE_CONNECTING_KEY,
        type: "error",
        content: t("messages.connectingLost"),
        duration: MESSAGE_SHOW_DURATION_S,
      });
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
  }, [messageApi, setUserId, t, userId]);

  return {
    isServerError,
  };
};
