import { useCallback } from "react";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseActionsProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useActions = ({ messageApi }: UseActionsProps) => {
  const { setRoom } = useGameState();
  const { userId, setUserId } = useAppStorage();
  const { language } = useAppSettings();

  const onCreateRoom = useCallback(() => {
    socket.emit("createRoom", { lang: language.lng }, (res) => {
      if (res.success) {
        setUserId(res.extra.userId);
        setRoom(res.room);
      } else {
        messageApi.open({
          type: "error",
          content: <TranslatedError errorCode={res.error.enumCode} />,
        });
      }
    });
  }, [language.lng, messageApi, setRoom, setUserId]);

  const startVoting = useCallback(() => {
    socket.emit("startVoting", null, (res) => {
      if (!res.success) {
        messageApi.open({
          type: "error",
          content: <TranslatedError errorCode={res.error.enumCode} />,
        });
      }
    });
  }, [messageApi]);

  const onReenterRoom = useCallback(() => {
    socket.emit("reenterRoom", null, (res) => {
      if (res.success) {
        setRoom(res.room);
      } else {
        messageApi.open({
          type: "error",
          content: <TranslatedError errorCode={res.error.enumCode} />,
        });
        setUserId("");
      }
    });
  }, [messageApi, setRoom, setUserId]);

  return {
    startVoting,
    onCreateRoom,
    onReenterRoom: userId ? onReenterRoom : undefined,
  };
};
