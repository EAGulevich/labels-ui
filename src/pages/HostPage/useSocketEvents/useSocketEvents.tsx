import { useEffect, useState } from "react";

import { SESSION_KEY_HOST_ID } from "@constants";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

export const useSocketEvents = () => {
  const [creatorId, setCreatorId] = useState(
    sessionStorage.getItem(SESSION_KEY_HOST_ID),
  );

  const [room, setRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    const onCreatedRoom: ServerToClientEvents["createdRoom"] = (data) => {
      sessionStorage.setItem(
        SESSION_KEY_HOST_ID,
        data.eventData.createdRoom.creatorId,
      );
      setRoom(data.room);
    };

    const onCreatingRoomError: ServerToClientEvents["creatingRoomError"] =
      () => {
        sessionStorage.setItem(SESSION_KEY_HOST_ID, "");
        setCreatorId(null);
      };

    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);
    };

    const onDisconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    socket.on("createdRoom", onCreatedRoom);
    socket.on("creatingRoomError", onCreatingRoomError);
    socket.on("joinedPlayer", onJoinedPlayer);
    socket.on("disconnectedPlayer", onDisconnectedPlayer);

    return () => {
      socket.off("createdRoom", onCreatedRoom);
      socket.off("creatingRoomError", onCreatingRoomError);
      socket.off("joinedPlayer", onJoinedPlayer);
      socket.off("disconnectedPlayer", onDisconnectedPlayer);
    };
  }, []);

  return {
    creatorId,
    room,
  };
};
