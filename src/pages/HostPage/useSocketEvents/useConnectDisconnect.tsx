import { useEffect, useState } from "react";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { socket } from "@socket";

export const useConnectDisconnect = () => {
  const [isServerError, setIsServerError] = useState(false);
  const { userId, setUserId } = useAppStorage();

  useEffect(() => {
    const onConnect = () => {
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

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);

      // socket.disconnect();
    };
  }, [setUserId, userId]);

  return {
    isServerError,
  };
};
