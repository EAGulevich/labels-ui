import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { ServerToClientEvents } from "@sharedTypes/events.ts";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseReceiveFact = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useReceiveFact = ({ setRoom, messageApi }: UseReceiveFact) => {
  const { t } = useTranslation();
  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  useEffect(() => {
    const playerAddedFact: ServerToClientEvents["playerAddedFact"] = ({
      room,
      eventData,
    }) => {
      setRoom(room);
      getAudio(eventData.fromPlayer.avatarToken).play({
        userSettingsVolume: volume,
      });
    };

    socket.on("playerAddedFact", playerAddedFact);

    return () => {
      socket.off("playerAddedFact", playerAddedFact);
    };
  }, [getAudio, messageApi, setRoom, t, volume]);
};
