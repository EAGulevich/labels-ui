import { useEffect, useState } from "react";
import { Button, Card, QRCode, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { socket } from "../../socket.ts";
import { SESSION_CREATOR_ID_FILED_NAME } from "../../constants.ts";
import { Room } from "../../sharedTypesFromServer/types.ts";
import { PlayerAvatar } from "../../components/PlayerAvatar/PlayerAvatar.tsx";

const CreateRoomScreen = () => {
  const [creatorId, setCreatorId] = useState(
    sessionStorage.getItem(SESSION_CREATOR_ID_FILED_NAME),
  );
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const onCreatedRoom: ServerToClientEvents["createdRoom"] = (data) => {
      sessionStorage.setItem(
        SESSION_CREATOR_ID_FILED_NAME,
        data.eventData.createdRoom.creatorId,
      );
      setRoom(data.room);
    };

    const onCreatingRoomError: ServerToClientEvents["creatingRoomError"] =
      () => {
        sessionStorage.setItem(SESSION_CREATOR_ID_FILED_NAME, "");
        setCreatorId(null);
      };

    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);
    };

    const onDisconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    socket.on("createdRoom", onCreatedRoom);
    socket.on("creatingRoomError", onCreatingRoomError);
    socket.on("joinedPlayer", onJoinedPlayer);
    socket.on("disconnectedPlayer", onDisconnectedPlayer);

    return () => {
      socket.off("createdRoom", onCreatedRoom);
      socket.off("creatingRoomError", onCreatingRoomError);
      socket.off("joinedPlayer", onJoinedPlayer);
      socket.off("disconnectedPlayer", onDisconnectedPlayer);
    };
  }, []);

  if (!room) {
    return (
      <>
        {creatorId && (
          <Button
            onClick={() => {
              socket.emit("createRoom", creatorId);
            }}
          >
            Вернуться в игру
          </Button>
        )}

        <Button
          onClick={() => {
            socket.emit("createRoom", null);
            // TODO отправить эвенет на удаление старой комнаты
          }}
        >
          Создать комнату
        </Button>
      </>
    );
  }

  return (
    <div>
      <Card style={{ margin: "20px" }}>
        <div>
          <Typography.Text>
            {t("createRoomScreen.joinLinkText", {
              link: "game-labels.vercel.app",
            })}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text>
            {t("createRoomScreen.enterCode")}: {room?.code}
          </Typography.Text>
        </div>
        <QRCode
          value={`${window.location.origin}/join?roomCode=${room?.code}`}
        />
        <Typography.Text>{t("createRoomScreen.scan")}</Typography.Text>
      </Card>
      <Card>
        <Typography.Text>Игроки: </Typography.Text>
        {room?.players.map((player) => (
          <div>
            <PlayerAvatar token={player.avatarToken} />
            {player.name}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CreateRoomScreen;
