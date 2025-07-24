import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { vibrate } from "../utils/vibrate.ts";

type UseGameStartedProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useNewRound = ({ messageApi }: UseGameStartedProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();

  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  useEffect(() => {
    const newRoundStarted: ServerToClientEvents["newRoundStarted"] = ({
      room,
    }) => {
      setRoom(room);
      vibrate("roundStart");
    };

    socket.on("newRoundStarted", newRoundStarted);

    return () => {
      socket.off("newRoundStarted", newRoundStarted);
    };
  }, [getAudio, messageApi, setRoom, t, volume]);
};
