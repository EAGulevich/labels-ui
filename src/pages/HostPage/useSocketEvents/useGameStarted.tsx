import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseGameStartedProps = {
  setRoom: (room: Room) => void;
  setShowCountDownBeforeStart: (show: boolean) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useGameStarted = ({
  setRoom,
  messageApi,
  setShowCountDownBeforeStart,
}: UseGameStartedProps) => {
  const { t } = useTranslation();
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
