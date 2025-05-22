import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseGameStartedProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useNewRound = ({ setRoom, messageApi }: UseGameStartedProps) => {
  const { t } = useTranslation();
  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  useEffect(() => {
    const newRound: ServerToClientEvents["newRound"] = ({ room }) => {
      setRoom(room);
      getAudio("attention").play({ userSettingsVolume: volume });
    };

    socket.on("newRound", newRound);

    return () => {
      socket.off("newRound", newRound);
    };
  }, [getAudio, messageApi, setRoom, t, volume]);
};
