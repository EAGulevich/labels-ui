import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseReceiveFact = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useReceiveFact = ({ messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  useEffect(() => {
    const playerAddedFact: ServerToClientEvents["playerAddedFact"] = ({
      room,
      extra,
    }) => {
      setRoom(room);
      getAudio(extra.fromPlayer.avatar.token).play({
        userSettingsVolume: volume,
      });
    };

    socket.on("playerAddedFact", playerAddedFact);

    return () => {
      socket.off("playerAddedFact", playerAddedFact);
    };
  }, [getAudio, messageApi, setRoom, t, volume]);
};
