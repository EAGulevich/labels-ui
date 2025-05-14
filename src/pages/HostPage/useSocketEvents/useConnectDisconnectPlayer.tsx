import { useEffect } from "react";

import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseConnectDisconnectPlayerProps = {
  setRoom: (room: Room) => void;
};

export const useConnectDisconnectPlayer = ({
  setRoom,
}: UseConnectDisconnectPlayerProps) => {
  useEffect(() => {
    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);
    };

    const onDisconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    socket.on("joinedPlayer", onJoinedPlayer);
    socket.on("disconnectedPlayer", onDisconnectedPlayer);

    return () => {
      socket.off("joinedPlayer", onJoinedPlayer);
      socket.off("disconnectedPlayer", onDisconnectedPlayer);
    };
  }, [setRoom]);
};
