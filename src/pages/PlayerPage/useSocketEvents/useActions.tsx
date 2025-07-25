import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { PlayerClient, RoomClient } from "@shared/types";

import {
  MESSAGE_SHOW_RECONNECTING_DURATION_S,
  QUERY_PARAM_ROOM_CODE,
} from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

type UseActionsProps = {
  messageApi: ReturnType<typeof message.useMessage>[0];
};

const MESSAGE_ENTER_KEY = "MESSAGE_ENTER_KEY";

export const useActions = ({ messageApi }: UseActionsProps) => {
  const { t } = useTranslation();
  const { setRoom } = useGameState();
  const { setUserId, setUserName } = useAppStorage();

  const navigate = useNavigate();

  const onJoin = useCallback(
    ({
      roomCode,
      player,
    }: {
      roomCode: RoomClient["code"];
      player: Pick<PlayerClient, "name">;
    }) => {
      messageApi.open({
        key: MESSAGE_ENTER_KEY,
        type: "loading",
        content: t("messages.enteringRoom"),
        duration: MESSAGE_SHOW_RECONNECTING_DURATION_S,
      });
      socket.emit(
        "joinRoom",
        {
          roomCode,
          player,
        },
        (res) => {
          if (res.success) {
            setUserId(res.extra.userId);
            setUserName(res.extra.userName);
            setRoom(res.room);

            navigate({
              search: `?${QUERY_PARAM_ROOM_CODE}=${res.room.code}`,
            });

            messageApi.open({
              key: MESSAGE_ENTER_KEY,
              type: "success",
              content: t("messages.youEnteredInRoom"),
            });
          } else if (!res.success) {
            messageApi.open({
              key: MESSAGE_ENTER_KEY,
              type: "error",
              content: <TranslatedError errorCode={res.error.enumCode} />,
            });
          }
        },
      );
    },
    [setUserId, setUserName, setRoom, navigate, messageApi, t],
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
    socket.emit("startGame", null, (res) => {
      if (!res.success) {
        messageApi.open({
          type: "error",
          content: <TranslatedError errorCode={res.error.enumCode} />,
        });
      }
    });
  }, [messageApi]);

  const onShowResult = useCallback(() => {
    socket.emit("showResult", null, (res) => {
      if (!res.success) {
        messageApi.open({
          type: "error",
          content: <TranslatedError errorCode={res.error.enumCode} />,
        });
      }
    });
  }, [messageApi]);

  const addVote = useCallback(
    ({ factId, candidateId }: { candidateId: string; factId: number }) => {
      socket.emit("addVote", { candidateId, factId }, (res) => {
        if (!res.success) {
          messageApi.open({
            type: "error",
            content: <TranslatedError errorCode={res.error.enumCode} />,
          });
        }
      });
    },
    [messageApi],
  );

  const onSendFact = useCallback(
    ({ factText }: { factText: string }) => {
      socket.emit("addFact", { text: factText }, ({ room, error }) => {
        if (room) {
          setRoom(room);
        } else if (error) {
          messageApi.open({
            type: "error",
            content: <TranslatedError errorCode={error.enumCode} />,
          });
        }
      });
    },
    [messageApi, setRoom],
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
