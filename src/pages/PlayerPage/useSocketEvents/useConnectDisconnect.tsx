import { useEffect, useState } from "react";

import { socket } from "@socket";

export const useConnectDisconnect = () => {
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      // todo later: Попробовать перезайти в ранее созданную комнату, в которой игра уже началась
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
  }, []);

  return { isServerError };
};
