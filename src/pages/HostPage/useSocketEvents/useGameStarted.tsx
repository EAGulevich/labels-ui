import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ServerToClientEvents } from "@shared/types";

import { ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseGameStartedProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useGameStarted = ({ messageApi }: UseGameStartedProps) => {
  const { t } = useTranslation();
  const { setRoom, setShowCountDownBeforeStart } = useGameState();

  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  useEffect(() => {
    const gameStarted: ServerToClientEvents["gameStarted"] = ({ room }) => {
      setRoom(room);
      setShowCountDownBeforeStart(true);

      setTimeout(
        () => {
          setShowCountDownBeforeStart(false);
          getAudio("attention").play({ userSettingsVolume: volume });
        },
        ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S * 4 * 1000,
      );
    };

    socket.on("gameStarted", gameStarted);

    return () => {
      socket.off("gameStarted", gameStarted);
    };
  }, [getAudio, messageApi, setRoom, setShowCountDownBeforeStart, t, volume]);
};
