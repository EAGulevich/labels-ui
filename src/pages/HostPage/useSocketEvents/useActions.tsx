import { useCallback } from "react";
import { TranslatedError } from "@utils/TranslatedError.tsx";
import { message } from "antd";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { Room } from "@sharedTypes/types.ts";
import { socket } from "@socket";

type UseActionsProps = {
  setRoom: (room: Room) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
};

export const useActions = ({ setRoom, messageApi }: UseActionsProps) => {
  const { roomHostId, changeRoomHostId, removeRoomHostId } = useAppStorage();

  const onCreateRoom = useCallback(() => {
    socket.emit("createRoom", null, ({ room, eventData }) => {
      changeRoomHostId(eventData.newRoomHostId);
      setRoom(room);
    });
  }, [changeRoomHostId, setRoom]);

  const onReenterRoom = useCallback(() => {
    socket.emit(
      "reenterRoom",
      { roomHostId: roomHostId || "" },
      ({ data, error }) => {
        if (data) {
          changeRoomHostId(data.eventData.newRoomHostId);
          setRoom(data.room);
        } else if (error) {
          messageApi.open({
            type: "error",

            content: <TranslatedError errorCode={error.code} />,
          });
          removeRoomHostId();
        }
      },
    );
  }, [changeRoomHostId, messageApi, removeRoomHostId, roomHostId, setRoom]);

  return {
    onCreateRoom,
    onReenterRoom: roomHostId ? onReenterRoom : undefined,
  };
};
