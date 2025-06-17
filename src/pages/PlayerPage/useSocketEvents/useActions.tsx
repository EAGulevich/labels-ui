import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { QUERY_PARAM_ROOM_CODE } from "@constants";
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
  const navigate = useNavigate();

  const onJoin = useCallback(
    ({
      roomCode,
      player,
    }: {
      roomCode: Room["code"];
      player: Pick<Player, "name">;
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

            navigate({
              search: `?${QUERY_PARAM_ROOM_CODE}=${data.room.code}`,
            });

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
    [playerId, changePlayerId, setRoom, navigate, messageApi, t],
  );

  const onChangePlayerAvatar = useCallback(
    (avatarToken: Player["avatarToken"]) => {
      socket.emit("changeAvatar", { avatarToken }, ({ data, error }) => {
        if (data?.room) {
          setRoom(data.room);
        }

        if (error) {
          messageApi.open({
            type: "error",
            content: <TranslatedError errorCode={error.code} />,
          });
        }
      });
    },
    [messageApi, setRoom],
  );

  const onStart = useCallback(() => {
    socket.emit("startGame");
  }, []);

  const addVote = useCallback((candidateId: string) => {
    socket.emit("addVote", { candidateId }, ({ voted }) => {
      if (voted) {
        //  TODO: вибрация на телефон
      }
    });
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
    addVote,
    onChangePlayerAvatar,
  };
};
