import { useEffect, useState } from "react";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { socket } from "@socket";

export const useConnectDisconnect = () => {
  const [isServerError, setIsServerError] = useState(false);
  const { roomHostId, removeRoomHostId } = useAppStorage();

  useEffect(() => {
    const onConnect = () => {
      if (roomHostId) {
        socket.emit(
          "findRoomByHostId",
          {
            roomHostId,
          },
          ({ foundedRoom }) => {
            if (!foundedRoom) {
              removeRoomHostId();
            }
          },
        );
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
  }, [removeRoomHostId, roomHostId]);

  return {
    isServerError,
  };
};
