import { useEffect } from "react";

import { ServerToClientEvents } from "@shared/types";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

export const useConnectDisconnectPlayer = () => {
  const { setRoom } = useGameState();

  const {
    audio: { getAudio },
  } = useAppSettings();

  const { volume } = useAppStorage();

  useEffect(() => {
    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = ({ room }) => {
      setRoom(room);
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
