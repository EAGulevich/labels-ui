import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { Player, Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseActionsProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useActions = ({ setRoom, messageApi }: UseActionsProps) => {
  const { t } = useTranslation();
  const { playerId, changePlayerId } = useAppStorage();

  const onJoin = useCallback(
    ({
      roomCode,
      player,
    }: {
      roomCode: Room["code"];
      player: Pick<Player, "name" | "avatarToken">;
    }) => {
      socket.emit(
        "joinRoom",
        {
          roomCode,
          player,
          prevPlayerId: playerId || "",
        },
        ({ data, error }) => {
          if (data?.room) {
            changePlayerId(data.eventData.joinedPlayer.id);
            setRoom(data.room);
            messageApi.open({
              type: "success",
              content: t("messages.youEnteredInRoom"),
            });

            if (data.eventData.joinedPlayer.isVip) {
              messageApi.open({
                type: "info",
                content: t("messages.youHaveBecomeVIP"),
              });
            }
          } else if (error) {
            messageApi.open({
              type: "error",
              content: <TranslatedError errorCode={error.code} />,
            });
          }
        },
      );
    },
    [playerId, changePlayerId, setRoom, messageApi, t],
  );

  const onStart = useCallback(() => {
    socket.emit("startGame");
  }, []);

  const onSendFact = useCallback(
    ({ factText }: { factText: string }) => {
      socket.emit("addFact", { text: factText }, ({ data, error }) => {
        if (data) {
          setRoom(data.room);
        } else if (error) {
          console.error(error);
        }
      });
    },
    [setRoom],
  );

  return {
    onJoin,
    onStart,
    onSendFact,
  };
};
