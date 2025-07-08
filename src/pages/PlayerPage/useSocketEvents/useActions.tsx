import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { PlayerClient, RoomClient } from "@shared/types";

import { QUERY_PARAM_ROOM_CODE } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseActionsProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useActions = ({ messageApi }: UseActionsProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();
  const { setUserId } = useAppStorage();

  const navigate = useNavigate();

  const onJoin = useCallback(
    ({
      roomCode,
      player,
    }: {
      roomCode: RoomClient["code"];
      player: Pick<PlayerClient, "name">;
    }) => {
      socket.emit(
        "joinRoom",
        {
          roomCode,
          player,
        },
        (res) => {
          if (res.success) {
            setUserId(res.extra.userId);
            setRoom(res.room);

            navigate({
              search: `?${QUERY_PARAM_ROOM_CODE}=${res.room.code}`,
            });

            messageApi.open({
              type: "success",
              content: t("messages.youEnteredInRoom"),
            });

            if (
              res.room.players.find((p) => p.id === res.extra.userId)?.isVip
            ) {
              messageApi.open({
                type: "info",
                content: t("messages.youHaveBecomeVIP"),
              });
            }
          } else if (!res.success) {
            messageApi.open({
              type: "error",
              content: <TranslatedError errorCode={res.error.enumCode} />,
            });
          }
        },
      );
    },
    [setUserId, setRoom, navigate, messageApi, t],
  );

  const onChangePlayerAvatar = useCallback(
    (avatarToken: PlayerClient["avatar"]["token"]) => {
      socket.emit("changeAvatar", { avatarToken }, (res) => {
        if (res.success) {
          setRoom(res.room);
        }

        if (res.error) {
          messageApi.open({
            type: "error",
            content: <TranslatedError errorCode={res.error.enumCode} />,
          });
        }
      });
    },
    [messageApi, setRoom],
  );

  const onStart = useCallback(() => {
    socket.emit("startGame", null, () => {
      // todo resonse обработать
    });
  }, []);

  const onShowResult = useCallback(() => {
    socket.emit("showResult", null, () => {
      //   todo
    });
  }, []);

  const addVote = useCallback(
    ({ factId, candidateId }: { candidateId: string; factId: number }) => {
      socket.emit("addVote", { candidateId, factId }, ({ extra }) => {
        if (extra?.voted) {
          //  TODO: вибрация на телефон
        }
      });
    },
    [],
  );

  const onSendFact = useCallback(
    ({ factText }: { factText: string }) => {
      socket.emit("addFact", { text: factText }, ({ room, error }) => {
        if (room) {
          setRoom(room);
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
    onShowResult,
  };
};
