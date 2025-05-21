import { useEffect } from "react";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseConnectDisconnectPlayerProps = {
  setRoom: (room: Room) => void;
};

export const useConnectDisconnectPlayer = ({
  setRoom,
}: UseConnectDisconnectPlayerProps) => {
  const {
    audio: { getAudio },
  } = useAppSettings();

  const { volume } = useAppStorage();

  useEffect(() => {
    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);
      getAudio("connectPlayer").play({ userSettingsVolume: volume });
    };

    const onDisconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
      getAudio("disconnectPlayer").play({ userSettingsVolume: volume });
    };

    const playerHasReconnected: ServerToClientEvents["playerHasReconnected"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    const playerLostConnection: ServerToClientEvents["playerLostConnection"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    socket.on("joinedPlayer", onJoinedPlayer);
    socket.on("disconnectedPlayer", onDisconnectedPlayer);
    socket.on("playerHasReconnected", playerHasReconnected);
    socket.on("playerLostConnection", playerLostConnection);

    return () => {
      socket.off("joinedPlayer", onJoinedPlayer);
      socket.off("disconnectedPlayer", onDisconnectedPlayer);
      socket.off("playerHasReconnected", playerHasReconnected);
      socket.off("playerLostConnection", playerLostConnection);
    };
  }, [getAudio, setRoom, volume]);
};
